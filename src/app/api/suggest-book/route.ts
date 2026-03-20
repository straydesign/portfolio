import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const body = await req.json();
    const book = typeof body.book === 'string' ? body.book.trim() : '';
    const reason = typeof body.reason === 'string' ? body.reason.trim() : '';

    if (book.length === 0) {
      return NextResponse.json({ error: 'Book name is required' }, { status: 400 });
    }

    if (book.length > 500 || reason.length > 2000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

    await resend.emails.send({
      from,
      to: 'tom@straydesign.co',
      subject: `Book Suggestion: ${book}`,
      text: `Someone suggested a book!\n\nBook: ${book}${reason ? `\n\nWhy: ${reason}` : ''}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send suggestion' }, { status: 500 });
  }
}
