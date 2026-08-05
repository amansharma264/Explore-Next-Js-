'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import courseData from '@/src/data/music_courses.json';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: initialCourse,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 pt-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
            We&apos;re here to help you start or elevate your musical journey. Reach out to our admissions team today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-zinc-950/80 border border-neutral-800 p-6 sm:p-10 rounded-2xl backdrop-blur-xl shadow-2xl">
          {/* Contact Details */}
          <div className="md:col-span-1 space-y-6 border-b md:border-b-0 md:border-r border-neutral-800 pb-8 md:pb-0 md:pr-6">
            <h3 className="text-xl font-bold text-teal-400">Get in Touch</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Have questions about our curriculum, faculty, or tuition plans? Drop us a message or visit our campus.
            </p>

            <div className="space-y-4 pt-4">
              <div>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Campus Location</p>
                <p className="text-sm text-neutral-200 mt-1">Bangalore</p>
              </div>

              <div>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Email Admissions</p>
                <p className="text-sm text-teal-400 mt-1">officialamansharma264@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto">
                  Your message has been received. Our admissions team will reach out to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-zinc-800 text-neutral-200 hover:bg-zinc-700 text-sm font-medium transition duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-teal-500 transition duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-teal-500 transition duration-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Interested Course (Optional)
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-teal-500 transition duration-200 text-sm"
                  >
                    <option value="">Select a course...</option>
                    {courseData.courses.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.title} (${c.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your background and musical aspirations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-teal-500 transition duration-200 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition duration-200 text-sm shadow-lg shadow-teal-900/30 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-36">
        <p className="text-neutral-400">Loading contact page...</p>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}