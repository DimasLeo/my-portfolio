import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css'; // jika kamu punya file CSS kustom
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Portfolio',
  description: 'Portfolio Website using Next.js & Bootstrap',
  icons: {
    icon: '/P.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
