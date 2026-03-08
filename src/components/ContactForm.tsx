'use client';

import { useState, FormEvent } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = theme === 'dark' ? '#ffffff' : '#1d1d1f';
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const inputBg = theme === 'dark' ? '#2a2a2a' : '#f5f5f7';
  const inputBorder = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

  const buttonTextColor = (accentColor === 'bw' && theme === 'dark') ? '#000000'
    : (accentColor === 'bw' && theme === 'light') ? '#ffffff'
    : (accentColor === 'yellow' || accentColor === 'tan') ? '#000000'
    : '#ffffff';

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
        <CheckCircle className="w-10 h-10 mx-auto mb-3" style={{ color: primaryColor }} />
        <p className="text-lg font-bold mb-1" style={{ color: textColor }}>Message sent</p>
        <p className="text-sm" style={{ color: secondaryTextColor }}>I&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline"
          style={{ color: primaryColor }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-1" style={{ color: secondaryTextColor }}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textColor }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-1" style={{ color: secondaryTextColor }}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-base outline-none transition-all focus:ring-2"
          style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textColor }}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-1" style={{ color: secondaryTextColor }}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={compact ? 3 : 4}
          className="w-full px-4 py-2.5 rounded-xl text-base outline-none transition-all focus:ring-2 resize-none"
          style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textColor }}
          placeholder="Tell me about your project..."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm" style={{ color: '#ef4444' }}>
          <AlertTriangle className="w-4 h-4" />
          Something went wrong. Try again or email tlsesler44@gmail.com directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base transition-all hover:scale-105 font-bold disabled:opacity-60"
        style={{ backgroundColor: primaryColor, color: buttonTextColor }}
      >
        <Send className="w-4 h-4" />
        {status === 'sending' ? 'Sending...' : 'Get My Free Consultation'}
      </button>

      <p className="text-xs text-center" style={{ color: secondaryTextColor }}>
        Or email directly at <a href="mailto:tlsesler44@gmail.com" style={{ color: primaryColor }}>tlsesler44@gmail.com</a>
      </p>
    </form>
  );
}
