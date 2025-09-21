import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css'; 
import { ReactNode } from 'react';
import BootstrapClient from './BootstrapClient'; // ✅ dipanggil

export const metadata = {
  title: 'My Portfolio',
  description: 'Portfolio Website using Next.js & Bootstrap',
  icons: {
    icon: '/P.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient /> {/* ✅ render di client */}
      </body>
    </html>
  );
}
