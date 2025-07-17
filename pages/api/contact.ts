import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Semua field harus diisi.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
    from: `"Web Portofolio" <${process.env.EMAIL_USER}>`, 
    to: 'dimasleo12345@gmail.com',
    replyTo: email, 
    subject: `[Pesan dari website portofolio] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <h2 style="color: #5c6653; margin-bottom: 20px;">📥Pesan dari website portofolio yang Anda buat</h2>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #76866e;">Nama:</td>
                <td style="padding: 10px 0;">${name}</td>
                </tr>
                <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #76866e;">Email:</td>
                <td style="padding: 10px 0;">${email}</td>
                </tr>
                <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #76866e;">Subjek:</td>
                <td style="padding: 10px 0;">${subject}</td>
                </tr>
                <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #76866e; vertical-align: top;">Pesan:</td>
                <td style="padding: 10px 0; white-space: pre-line; color: #333333;">${message}</td>
                </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px; color: #999999; text-align: center;">
                Email ini dikirim dari halaman kontak website portofolio Anda.
            </p>
            </div>
        </div>
        `,
    });

    res.status(200).json({ message: 'Pesan berhasil dikirim!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Gagal mengirim email.' });
  }
}
