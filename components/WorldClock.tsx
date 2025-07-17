'use client';
import { useEffect, useState } from 'react';

const localeMap = {
  en: 'en-US',
  id: 'id-ID',
  jp: 'ja-JP',
};

const WorldClock = ({ language }: { language: 'en' | 'id' | 'jp' }) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const locale = localeMap[language]; // Gunakan kode lokal yang benar

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <div className="text-black fw-semibold shadow-sm px-3 py-1 rounded-3 clock-glow">
      {formatTime(time)} | {formatDate(time)}
    </div>
  );
};

export default WorldClock;
