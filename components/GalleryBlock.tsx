'use client';
import { useState } from 'react';
import Image from 'next/image';

export type GalleryItem = {
  id: number;
  src: string;
  category: 'sertificate' | 'photography';
};

interface GalleryBlockProps {
  title: string;
  galleryItems: GalleryItem[];
}

const GalleryBlock = ({ title, galleryItems }: GalleryBlockProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [mainFilter, setMainFilter] = useState<'all' | 'sertificate' | 'photography'>('all');
  const [overlayFilter, setOverlayFilter] = useState<'all' | 'sertificate' | 'photography'>('all');

  const getFiltered = (
    data: GalleryItem[],
    filter: 'all' | 'sertificate' | 'photography'
  ) => (filter === 'all' ? data : data.filter(item => item.category === filter));

  const mainGallery = getFiltered(galleryItems, mainFilter);
  const overlayGallery = getFiltered(galleryItems.slice(6), overlayFilter); // ✅ fix

  return (
    <section className="gallery-section relative">
      <div className="container text-center">
        <h2><span className="fw-bold">{title}</span></h2>
        <p className="text-muted">This is a curated collection of my certifications and photography work.</p>

        {/* Main Filter */}
        <div className="filter-buttons mb-4">
          <button onClick={() => setMainFilter('all')} className={mainFilter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setMainFilter('sertificate')} className={mainFilter === 'sertificate' ? 'active' : ''}>Sertificate</button>
          <button onClick={() => setMainFilter('photography')} className={mainFilter === 'photography' ? 'active' : ''}>Photography</button>
        </div>

        {/* Main Gallery Grid */}
        <div className="gallery-grid">
          {mainGallery.slice(0, 6).map(item => (
            <a key={item.id} href={item.src} target="_blank" rel="noopener noreferrer" className="gallery-card">
              <Image src={item.src} alt="gallery" width={500} height={400} />
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {galleryItems.length > 6 && !showOverlay && (
          <button className="load-more-btn mt-4" onClick={() => setShowOverlay(true)}>
            Load More
          </button>
        )}

        {/* Overlay Section */}
        {showOverlay && (
          <div className="overlay-card-inside">
            <div className="overlay-content">
              <button className="close-btn" onClick={() => setShowOverlay(false)}>✕</button>
              <h3 className="mb-3">More Gallery</h3>

              {/* Overlay Filter */}
              <div className="filter-buttons mb-4">
                <button onClick={() => setOverlayFilter('all')} className={overlayFilter === 'all' ? 'active' : ''}>All</button>
                <button onClick={() => setOverlayFilter('sertificate')} className={overlayFilter === 'sertificate' ? 'active' : ''}>Sertificate</button>
                <button onClick={() => setOverlayFilter('photography')} className={overlayFilter === 'photography' ? 'active' : ''}>Photography</button>
              </div>

              {/* Overlay Gallery Grid */}
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

export default GalleryBlock;
