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

    if (resendApiKey) {
      console.log(` Attempting Resend delivery to: ${receiverEmail} using API key starting with ${resendApiKey.substring(0, 7)}...`);
      
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
        console.log('✅ Resend Dispatch Success! Email ID:', responseData.id);
        return NextResponse.json({
          success: true,
          message: 'Your message has been sent successfully to your email!',
          emailId: responseData.id,
        });
      } else {
        console.error('❌ Resend API Error Response:', responseData);
        return NextResponse.json(
          { error: responseData.message || 'Resend failed to deliver email.' },
          { status: 400 }
        );
      }
    }

    // Fallback if no API key provided
    console.log('📬 --- CONTACT SUBMISSION RECEIVED (DEV MODE) ---');
    console.log(`To: ${receiverEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Course: ${course || 'General'}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------------------------');

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
