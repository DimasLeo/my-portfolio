'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjekSection.css';

interface ProjekSectionProps {
  language: 'en' | 'id' | 'jp';
}

const translations = {
  en: {
    title: 'My Project',
    projects: [
      {
        title: 'Game RPG ( IN PROGRESS )',
        desc: 'A classic fantasy RPG set in a peaceful countryside with hidden mysteries.',
        images: [
          '/images/Coming Soon.png',
        ],
      },
      {
        title: 'Project Skill Competency Test',
        desc: 'A web-based point-of-sale application developed for the Uji Kompetensi Keahlian (UKK) project, featuring product management, transaction system, and two user roles: Admin and Cashier.',
        images: [
          '/images/Ujikom admin (1).png',
          '/images/Ujikom admin (2).png',
          '/images/Ujikom admin (3).png',
          '/images/Ujikom kasir (1).png',
          '/images/Ujikom kasir (2).png',
          '/images/Ujikom kasir (3).png',
          '/images/login ujikom.png',
        ],
      },
      {
        title: 'IRS Dashboard Web ( Internship )',
        desc: 'A web dashboard application used to record and monitor transaction results',
        images: [
          '/images/IRS DASHBOARD.png',
        ],
      },
    ],
  },
  id: {
    title: 'Projek Saya',
    projects: [
      {
        title: 'Game RPG ( Dalam Progres )',
        desc: 'RPG fantasi klasik berlatar pedesaan yang damai dengan misteri tersembunyi.',
        images: [
          '/images/Coming Soon.png',
        ],
      },
      {
        title: 'Uji Kompetensi Keahlian',
        desc: 'Aplikasi kasir berbasis web yang dibuat untuk proyek Uji Kompetensi Keahlian (UKK), dilengkapi dengan fitur manajemen produk, sistem transaksi, dan dua role pengguna yaitu Admin dan Kasir.',
        images: [
          '/images/Ujikom admin (1).png',
          '/images/Ujikom admin (2).png',
          '/images/Ujikom admin (3).png',
          '/images/Ujikom kasir (1).png',
          '/images/Ujikom kasir (2).png',
          '/images/Ujikom kasir (3).png',
          '/images/login ujikom.png',
        ],
      },
      {
        title: 'IRS Dashboard Web ( Magang )',
        desc: 'Aplikasi dashboard web yang digunakan untuk mencatat dan memantau hasil transaksi.',
        images: [
          '/images/IRS DASHBOARD.png',
        ],
      },
    ],
  },
  jp: {
    title: '私のプロジェクト',
    projects: [
      {
        title: 'RPGゲーム（進行中）',
        desc: '隠された謎に満ちた静かな田舎を舞台にした古典的なファンタジー RPG。',
        images: [
          '/images/Coming Soon.png',
        ],
      },
      {
        title: 'スキル能力テスト',
        desc: 'スキル能力テスト (UKK) プロジェクト用に作成された Web ベースのレジ アプリケーション。製品管理機能、トランザクション システム、および 2 つのユーザー ロール (管理者とレジ担当者) を備えています。',
        images: [
          '/images/Ujikom admin (1).png',
          '/images/Ujikom admin (2).png',
          '/images/Ujikom admin (3).png',
          '/images/Ujikom kasir (1).png',
          '/images/Ujikom kasir (2).png',
          '/images/Ujikom kasir (3).png',
          '/images/login ujikom.png',
        ],
      },
      {
        title: 'IRS ダッシュボード Web (インターンシップ)',
        desc: 'トランザクション結果を記録および監視するために使用される Web ダッシュボード アプリケーション。',
        images: [
          '/images/IRS DASHBOARD.png',
        ],
      },
    ],
  },
};

export default function ProjekSection({ language }: ProjekSectionProps) {
  const t = translations[language];
  const [current, setCurrent] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % t.projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [t.projects.length]);

  return (
    <section className="projek-section">
      <h2 className="projek-title">
        {t.title.split(' ').map((word, index) =>
          index === 0 ? (
            <span key={index} className="custom-title-color">{word}</span>
          ) : (
            <span key={index}> {word}</span>
          )
        )}
      </h2>

      <div className="projek-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="projek-slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.2 }}
          >
            <div
              className="projek-image"
              onClick={() => {
                setGalleryImages(t.projects[current].images);
                setGalleryOpen(true);
              }}
              style={{ position: 'relative', cursor: 'pointer' }}
            >
              <img
                src={t.projects[current].images[0]}
                alt={t.projects[current].title}
              />
              <div className="image-overlay-count">
                {t.projects[current].images.length}+
              </div>
            </div>
            <div className="projek-content">
              <h3>{t.projects[current].title}</h3>
              <p>{t.projects[current].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="projek-dots">
        {t.projects.map((_, i) => (
          <span
            key={i}
            className={`projek-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>

      {galleryOpen && (
  <div className="gallery-overlay" onClick={() => setGalleryOpen(false)}>
    <div
      className="gallery-content"
      onClick={(e) => e.stopPropagation()}
    >
      {galleryImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Gallery ${index}`}
          className="gallery-image-large"
        />
      ))}
    </div>
  </div>
)}

    </section>
  );
}
