'use client';
import { useState } from 'react';
import Image from 'next/image';
import './Gallery.css';


const allGallery = [
  // sertificate
  { id: 1, src: '/images/SERTI1.png', category: 'sertificate' },
  { id: 2, src: '/images/SERTI2.png', category: 'sertificate' },
  { id: 4, src: '/images/SERTI3.jpg', category: 'sertificate' },
  { id: 5, src: '/images/SERTI4.png', category: 'sertificate' },

  // photography
  { id: 6, src: '/images/Grap2.jpg', category: 'photography' },
  { id: 7, src: '/images/Grap3.jpg', category: 'photography' },
  { id: 8, src: '/images/Grap4.jpg', category: 'photography' },
  { id: 9, src: '/images/Grap1.jpg', category: 'photography' },

  // sertificate
  { id: 11, src: '/images/Coming Soon.png', category: 'sertificate' },
  { id: 12, src: '/images/Coming Soon.png', category: 'sertificate' },
  { id: 13, src: '/images/Coming Soon.png', category: 'sertificate' },
  { id: 14, src: '/images/Coming Soon.png', category: 'sertificate' },


  // photography
  { id: 15, src: '/images/Coming Soon.png', category: 'photography' },
  { id: 16, src: '/images/Coming Soon.png', category: 'photography' },
  { id: 17, src: '/images/Coming Soon.png', category: 'photography' },
  { id: 18, src: '/images/Coming Soon.png', category: 'photography' },
];

const translations = {
  en: {
    title: 'My Gallery',
    subtitle: 'This is the gallery section that showcases the certificates that I have earned as well as photos shot by my camera.',
    moreGallery: 'More Gallery',
    loadMore: 'Load More',
    categories: {
      all: 'All',
      sertificate: 'Certificate',
      photography: 'Photography',
    },
  },
  id: {
    title: 'Galeri Saya',
    subtitle: 'Ini adalah bagian galeri yang menampilkan sertifikat yang telah saya peroleh serta foto-foto hasil bidikan kamera saya.',
    moreGallery: 'Galeri Lainnya',
    loadMore: 'Muat Lebih Banyak',
    categories: {
      all: 'Semua',
      sertificate: 'Sertifikat',
      photography: 'Fotografi',
    },
  },
  jp: {
    title: '私のギャラリー',
    subtitle: 'このギャラリー・コーナーでは、私が取得した賞状やカメラで撮影した写真を紹介している。',
    moreGallery: 'さらにギャラリーを見る',
    loadMore: 'もっと見る',
    categories: {
      all: 'すべて',
      sertificate: '証明書',
      photography: '写真',
    },
  },
};

type GallerySectionProps = {
  language: 'en' | 'id' | 'jp';
};

const GallerySection = ({ language }: GallerySectionProps) => {
  const t = translations[language] || translations.en;

  const [showOverlay, setShowOverlay] = useState(false);
  const [mainFilter, setMainFilter] = useState<'all' | 'sertificate' | 'photography'>('all');
  const [overlayFilter, setOverlayFilter] = useState<'all' | 'sertificate' | 'photography'>('all');

  const getFiltered = (filter: typeof mainFilter) =>
    filter === 'all' ? allGallery : allGallery.filter(item => item.category === filter);

  const allMain = getFiltered(mainFilter);
  const allOverlay = getFiltered(overlayFilter);

  const MAIN_LIMIT = mainFilter === 'all' ? 8 : 4;
  const mainGallery = allMain.slice(0, MAIN_LIMIT);
  const overlayGallery = allOverlay;

  return (
    <section className="gallery-section relative">
      <div className="container text-center">
      <h2>
          <span className="fw-bold custom-title-color "  >{t.title.split(' ')[0]}</span>{' '}
          <span style={{ color: '#76866e' }}  >{t.title.split(' ')[1]}</span>
      </h2>
        <p className="text-muted"  style={{ fontSize: '22px' }} >{t.subtitle}</p>

        {/* Main Filter */}
        <div className="filter-buttons mb-4"  style={{ fontSize: '18px' }}>
          {(['all', 'sertificate', 'photography'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setMainFilter(cat)}
              className={mainFilter === cat ? 'active' : ''}
            >
              {t.categories[cat]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {mainGallery.map(item => (
            <a key={item.id} href={item.src} target="_blank" rel="noopener noreferrer" className="gallery-card">
              <Image src={item.src} alt="gallery" width={500} height={400} />
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {allMain.length > MAIN_LIMIT && !showOverlay && (
          <button
            className="load-more-btn mt-4" 
            style={{ fontSize: '18px' }}
            onClick={() => {
              setShowOverlay(true);
              setOverlayFilter(mainFilter);
            }}
          >
            {t.loadMore}
          </button>
        )}

        {/* Overlay */}
        {showOverlay && (
          <div className="overlay-card-inside" >
            <div className="overlay-content">
              <button className="close-btn" onClick={() => setShowOverlay(false)}>✕</button>
              <h3 className="mb-3" >{t.moreGallery}</h3>

              {/* Overlay Filter */}
              <div className="filter-buttons mb-4">
                {(['all', 'sertificate', 'photography'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setOverlayFilter(cat)}
                    className={overlayFilter === cat ? 'active' : ''}
                  >
                    {t.categories[cat]}
                  </button>
                ))}
              </div>

              <div className="gallery-grid">
                {overlayGallery.map(item => (
                  <a key={item.id} href={item.src} target="_blank" rel="noopener noreferrer" className="gallery-card">
                    <Image src={item.src} alt="gallery" width={500} height={400} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};



export default GallerySection;
