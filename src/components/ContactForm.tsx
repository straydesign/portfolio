'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c2441e47-8ca0-4f87-a2dc-928015553d51',
          name,
          email,
          message,
          from_name: 'straydesign.co',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center ${compact ? 'py-4' : 'py-8'}`}>
        <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#ffffff' }} />
        <p className="text-lg font-bold mb-1" style={{ color: '#ffffff' }}>Message sent</p>
        <p className="text-sm" style={{ color: '#a1a1a6' }}>I&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline"
          style={{ color: '#ffffff' }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-1" style={{ color: '#a1a1a6' }}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 text-base outline-none transition-all focus:ring-2 focus:ring-white/20"
          style={{ backgroundColor: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 0, color: '#ffffff' }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-1" style={{ color: '#a1a1a6' }}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 text-base outline-none transition-all focus:ring-2 focus:ring-white/20"
          style={{ backgroundColor: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 0, color: '#ffffff' }}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1" style={{ color: '#a1a1a6' }}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={compact ? 3 : 4}
          className="w-full px-4 py-2.5 text-base outline-none transition-all focus:ring-2 focus:ring-white/20 resize-none"
          style={{ backgroundColor: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 0, color: '#ffffff' }}
          placeholder="Tell me about your project..."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm" style={{ color: '#ef4444' }}>
          <AlertTriangle className="w-4 h-4" />
          Something went wrong. Try again or email tom@straydesign.co directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base transition-all hover:scale-105 font-bold disabled:opacity-60"
        style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
      >
        <Send className="w-4 h-4" />
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-xs text-center" style={{ color: '#a1a1a6' }}>
        Or email directly at <a href="mailto:tom@straydesign.co" style={{ color: '#ffffff' }}>tom@straydesign.co</a>
      </p>
    </form>
  );
}
