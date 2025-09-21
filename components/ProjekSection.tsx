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
        title: 'Portfolio Website',
        desc: 'A personal portfolio built with Next.js and Tailwind CSS.',
        images: [
          '/images/Foto1.png',
          '/images/project1-2.jpg',
          '/images/project1-3.jpg',
        ],
      },
      {
        title: 'E-commerce App',
        desc: 'An online shop with user authentication and payment system.',
        images: [
          '/images/project2.jpg',
          '/images/project2-2.jpg',
        ],
      },
      {
        title: 'Skill Competency Test',
        desc: 'A simple task management tool for daily planning.',
        images: [
          '/images/project3.jpg',
          '/images/project3-2.jpg',
        ],
      },
    ],
  },
  id: {
    title: 'Projek Saya',
    projects: [
      {
        title: 'Website Portofolio',
        desc: 'Portofolio pribadi menggunakan Next.js dan Tailwind CSS.',
        images: [
          '/images/project1.jpg',
          '/images/project1-2.jpg',
          '/images/project1-3.jpg',
        ],
      },
      {
        title: 'Aplikasi E-commerce',
        desc: 'Toko online dengan autentikasi pengguna dan sistem pembayaran.',
        images: [
          '/images/project2.jpg',
          '/images/project2-2.jpg',
        ],
      },
      {
        title: 'Uji Kompetensi Keahlian',
        desc: 'Alat manajemen tugas sederhana untuk perencanaan harian.',
        images: [
          '/images/project3.jpg',
          '/images/project3-2.jpg',
        ],
      },
    ],
  },
  jp: {
    title: '私のプロジェクト',
    projects: [
      {
        title: 'ポートフォリオサイト',
        desc: 'Next.jsとTailwind CSSで作られた個人ポートフォリオ。',
        images: [
          '/images/project1.jpg',
          '/images/project1-2.jpg',
          '/images/project1-3.jpg',
        ],
      },
      {
        title: 'Eコマースアプリ',
        desc: 'ユーザー認証と決済機能を備えたオンラインショップ。',
        images: [
          '/images/project2.jpg',
          '/images/project2-2.jpg',
        ],
      },
      {
        title: '宇治コンペティション・ケアリアン',
        desc: '日々の計画のためのシンプルなタスク管理ツール。',
        images: [
          '/images/project3.jpg',
          '/images/project3-2.jpg',
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
            transition={{ duration: 0.6 }}
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
              className="gallery-image"
            />
          ))}
        </div>
      </div>
    )}
    </section>
  );
}
