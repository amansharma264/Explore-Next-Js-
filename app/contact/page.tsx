'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  const isSubmittedQuery = searchParams.get('submitted') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: initialCourse,
    message: '',
  });

  const [submitted, setSubmitted] = useState(isSubmittedQuery);

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDirectEmailClick = () => {
    const subject = encodeURIComponent(`Music Academy Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCourse: ${formData.course || 'General'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:officialamansharma264@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-900/60 p-8 rounded-2xl border border-neutral-800 backdrop-blur-xl shadow-2xl">
      {/* Info Side */}
      <div className="space-y-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Get in Touch</h2>
          <p className="text-neutral-300 mb-6">
            Have questions about our curriculum, faculty, or tuition plans? Drop us a message or visit our campus.
          </p>
          <div className="space-y-4 text-sm text-neutral-300">
            <div>
              <h3 className="font-semibold text-neutral-400 uppercase tracking-wider text-xs">Campus Location</h3>
              <p className="text-lg text-white font-medium">Bangalore</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-400 uppercase tracking-wider text-xs">Email Admissions</h3>
              <a href="mailto:officialamansharma264@gmail.com" className="text-teal-400 hover:underline">
                officialamansharma264@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-teal-950/40 border border-teal-800/40 rounded-xl text-xs text-teal-300">
          💡 <strong>Direct Email:</strong> You can also email us directly at <a href="mailto:officialamansharma264@gmail.com" className="underline font-semibold">officialamansharma264@gmail.com</a>.
        </div>
      </div>

      {/* Form Side */}
      <div>
        {submitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 bg-teal-950/20 border border-teal-800/30 rounded-xl">
            <div className="w-14 h-14 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
            <p className="text-neutral-300 text-sm">
              Thank you for reaching out! Your message has been routed to <span className="text-teal-400 font-medium">officialamansharma264@gmail.com</span>. We will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-neutral-400 underline hover:text-teal-400"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            action="https://formsubmit.co/officialamansharma264@gmail.com"
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="space-y-4"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value={`Music Academy Inquiry from ${formData.name || 'Student'}`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Interested Course (Optional)
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Guitar Fundamentals">Guitar Fundamentals ($99.99)</option>
                <option value="Piano Masterclass">Piano Masterclass ($129.99)</option>
                <option value="Vocal Training">Vocal Training ($119.99)</option>
                <option value="Music Production Fundamentals">Music Production Fundamentals ($149.99)</option>
                <option value="Songwriting Essentials">Songwriting Essentials ($159.99)</option>
                <option value="Jazz Improvisation">Jazz Improvisation ($139.99)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="How can we help you?"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message &rarr;</span>
              </button>

              <button
                type="button"
                onClick={handleDirectEmailClick}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium py-2.5 px-6 rounded-lg text-xs transition-colors"
              >
                ✉️ Open in Email App (Direct Mail)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
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
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out for course inquiries, campus visits, or general questions.
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-12 text-neutral-400">Loading contact form...</div>
        }>
          <ContactFormContent />
        </Suspense>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}