import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, course, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      // Send live email via Resend HTTP API
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Music Academy Contact <onboarding@resend.dev>',
          to: ['officialamansharma264@gmail.com'],
          reply_to: email,
          subject: `New Inquiry from ${name}${course ? ` (${course})` : ''}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #0d9488;">New Music Academy Contact Inquiry</h2>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
              <p><strong>Full Name:</strong> ${name}</p>
              <p><strong>Email Address:</strong> ${email}</p>
              <p><strong>Interested Course:</strong> ${course || 'General Inquiry'}</p>
              <p><strong>Message Content:</strong></p>
              <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0d9488; margin: 10px 0;">
                ${message.replace(/\n/g, '<br/>')}
              </blockquote>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Resend API dispatch failed:', errorData);
        return NextResponse.json(
          { error: errorData.message || 'Failed to dispatch email notification.' },
          { status: 500 }
        );
      }
    } else {
      // Development mode fallback logging
      console.log('📬 --- NEW CONTACT FORM SUBMISSION RECEIVED ---');
      console.log(`👤 Name: ${name}`);
      console.log(`✉️ Email: ${email}`);
      console.log(`🎓 Course: ${course || 'General'}`);
      console.log(`💬 Message: ${message}`);
      console.log('------------------------------------------------');
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('API Route Error /api/contact:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
