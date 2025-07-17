'use client';

import React, { useState } from 'react';
import './ContactSection.css';

interface ContactSectionProps {
  language: 'en' | 'id' | 'jp';
}

const translations = {
  en: {
    title: 'Contact Me',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    button: 'Send Message',
  },
  id: {
    title: 'Hubungi Saya',
    name: 'Nama',
    email: 'Email',
    subject: 'Subjek',
    message: 'Pesan',
    button: 'Kirim Pesan',
  },
  jp: {
    title: 'お問い合わせ',
    name: '名前',
    email: 'メール',
    subject: '件名',
    message: 'メッセージ',
    button: '送信',
  },
};

const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = translations[language];
  const titleWords = t.title.split(' ');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok) {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } else {
      setStatus(data.message);
    }
  };

  return (
    <section className="contact-section-card">
      <h2 className="contact-title" style={{ fontSize: '45px' }}>
        <span className="custom-title-color">{titleWords[0]}</span>
        {titleWords.length > 1 && (
          <span style={{ color: '#d2b48c' }}> {titleWords.slice(1).join(' ')}</span>
        )}
      </h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row top-row">
          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder={t.name}
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder={t.email}
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="subject"
              type="text"
              placeholder={t.subject}
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row bottom-row">
          <div className="form-group full-width">
            <textarea
              name="message"
              rows={6}
              placeholder={t.message}
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <div className="spinner" /> : t.button}
        </button>

        {showSuccess && (
        <div className="toast-notification">
          <div className="toast-card">
            <span>📤 Pesan kamu berhasil dikirim!</span>
          </div>
        </div>
      )}


        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
};

export default ContactSection;
