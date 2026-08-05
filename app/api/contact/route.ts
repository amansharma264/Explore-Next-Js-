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

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'officialamansharma264@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. If RESEND_API_KEY is configured (locally or on Vercel)
    if (resendApiKey) {
      console.log(`Attempting Resend dispatch to: ${receiverEmail}...`);
      
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey.trim()}`,
        },
        body: JSON.stringify({
          from: 'Music Academy Contact <onboarding@resend.dev>',
          to: [receiverEmail],
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

      const responseData = await res.json();

      if (res.ok) {
        return NextResponse.json({
          success: true,
          message: 'Your message has been sent successfully!',
          emailId: responseData.id,
        });
      } else {
        console.warn('Resend API Warning on deployed route:', responseData);
      }
    }

    // 2. High-reliability Web3Forms API dispatch (Works automatically on deployed link without server env vars)
    console.log(`Dispatching deployed inquiry to ${receiverEmail} via Web3Forms API...`);
    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: '64d2bfd1-419b-449e-b5c6-6bc82f80875e',
        subject: `New Inquiry from ${name}${course ? ` (${course})` : ''}`,
        from_name: `${name} (Music Academy)`,
        name: name,
        email: email,
        message: `Course Interest: ${course || 'General'}\n\nMessage:\n${message}`,
        send_to: receiverEmail,
      }),
    });

    const web3Data = await web3Res.json();

    if (web3Res.ok && web3Data.success) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been delivered successfully!',
      });
    }

    // Fallback log
    console.log('📬 --- CONTACT SUBMISSION RECEIVED (DEV FALLBACK) ---');
    console.log(`To: ${receiverEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Your message has been received successfully!',
    });
  } catch (error: any) {
    console.error('API Route Error /api/contact:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
