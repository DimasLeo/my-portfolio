'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';

const WorldClock = dynamic(() => import('@/components/WorldClock'), { ssr: false });

const translations = {
  en: {
    navItems: ["Home", "About", "Service", "Gallery", "Contact"],
    welcome: "Welcome!",
    iam: "I Am",
    sDesc: "Front-End Developer.",
    aboutTitle: "Hello, I am Dimas Leo Anuggrah",
    aboutDesc: "I am a graduate of Wikrama Bogor high school in 2025 from Software Engineering major (now called PPLG Software and Game Development). I focus as a Front-End Developer with expertise in building web interfaces using Next.js, React.js, JavaScript, and CSS. I enjoy creating clean, responsive, and functional user experiences. Outside of programming, I also have a hobby of photographing nature and simple moments around me - this helps me hone the visual aesthetic in every piece I create.",
    serviceTitle: "My Services",
    serviceDesc: "I deliver affordable yet quality web development, photography and design, perfect for individuals and small businesses who want to look their best.",
    services: ["Web Development", "Photography", "UI/UX Design"],
    serviceDescriptions: [
      "Building responsive and dynamic websites.",
      "Capturing moments with artistic vision.",
      "Designing intuitive and engaging user interfaces."
    ],
    cvText: "Download CV",
    typedTexts: ["Programmer & Photographer"],
    labels: {
      age: "Age",
      address: "Address",
      phone: "Phone",
      email: "Email",
      bio: {
        name: "Dimas Leo Anuggrah",
        age: "17",
        address: "Kp. Kongsi, Cigombong, Bogor"
      }
    },
    timeLabels: { am: "AM", pm: "PM" }
  },
  id: {
    navItems: ["Beranda", "Tentang", "Layanan", "Sertifikat", "Kontak"],
    welcome: "Selamat datang!",
    iam: "Saya adalah",
    sDesc: "Front-End Developer.",
    aboutTitle: "Halo, saya Dimas Leo Anuggrah",
    aboutDesc: "Saya adalah lulusan SMK Wikrama Bogor pada tahun 2025  dari jurusan Rekayasa Perangkat Lunak (sekarang disebut PPLG Pengembangan Perangkat Lunak dan Gim). Saya berfokus sebagai Front-End Developer dengan keahlian dalam membangun antarmuka web menggunakan Next.js, React.js, JavaScript, dan CSS. Saya senang menciptakan pengalaman pengguna yang bersih, responsif, dan fungsional. Di luar dunia pemrograman, saya juga memiliki hobi memotret alam dan momen sederhana di sekitar saya — hal ini membantu saya mengasah estetika visual dalam setiap karya yang saya buat.",
    serviceTitle: "Layanan Saya",
    serviceDesc: "Saya menghadirkan pengembangan web , fotografi, dan desain yang terjangkau namun berkualitas, cocok untuk individu dan usaha kecil yang ingin tampil maksimal.",
    services: ["Pengembangan Web", "Fotografi", "Desain UI/UX"],
    serviceDescriptions: [
      "Membangun situs web yang responsif dan dinamis.",
      "Mengabadikan momen dengan sentuhan seni.",
      "Merancang antarmuka pengguna yang intuitif dan menarik."
    ],
    cvText: "Unduh CV",
    typedTexts: ["Programmer & Fotografer"],
    labels: {
      age: "Usia",
      address: "Alamat",
      phone: "Telepon",
      email: "Email",
      bio: {
        name: "Dimas Leo Anuggrah",
        age: "17 tahun",
        address: "Kp. Kongsi, Cigombong, Bogor"
      }
    },
    timeLabels: { am: "AM", pm: "PM" }
  },
  jp: {
    navItems: ["ホーム", "紹介", "サービス", "証明書", "連絡先"],
    welcome: "ようこそ！",
    iam: "私は",
    sDesc: "フロントエンド開発者です。",
    aboutTitle: "こんにちは、ディマス・レオ・アヌグラです",
    aboutDesc: "私は2025年にウィクラマ・ボゴール高校ソフトウェア工学科を卒業しました。フロントエンドデベロッパーとして、Next.js、React.js、JavaScript、CSSを使用したウェブインターフェースの構築を専門としています。クリーンで、レスポンシブで、機能的なユーザー体験を作るのが好きです。プログラミング以外では、身の回りの自然やシンプルな瞬間を写真に撮るのが趣味です。これはサンプルテキストです...",
    serviceTitle: "私のサービス",
    serviceDesc: "手頃な価格でありながら、クオリティの高いウェブ制作、写真撮影、デザインを提供しています。",
    services: ["ウェブ開発", "写真撮影", "UI/UXデザイン"],
    serviceDescriptions: [
      "レスポンシブで動的なウェブサイトを構築します。",
      "芸術的な視点で瞬間を捉えます。",
      "直感的で魅力的なユーザーインターフェースを設計します。"
    ],
    cvText: "履歴書をダウンロード",
    typedTexts: ["プログラマー & 写真家"],
    labels: {
      age: "年齢",
      address: "住所",
      phone: "電話",
      email: "メール",
      bio: {
        name: "ディマス・レオ・アヌグラ",
        age: "17歳",
        address: "インドネシア、ボゴール、チゴンボン、コンシ村"
      }
    },
    timeLabels: { am: "午前", pm: "午後" }
  }
};

export default function HomePage() {
  const [language, setLanguage] = useState<'en' | 'id' | 'jp'>('en');
  const t = translations[language];
  const typedTexts = t.typedTexts;
  const sectionIds = ['home', 'about', 'service', 'gallery', 'contact'];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const interval = setTimeout(() => {
      const current = typedTexts[index];
      if (isDeleting) {
        setText(prev => prev.slice(0, -1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((index + 1) % typedTexts.length);
        }
      } else {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (text === current) {
          setIsDeleting(true);
          setCharIndex(0);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(interval);
  }, [text, index, charIndex, isDeleting, typedTexts]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom bg-dark fixed-navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <WorldClock language={language} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'id' | 'jp')}
              className="language-selector"
            >
              <option value="en">🇺🇸 English</option>
              <option value="id">🇮🇩 Indonesia</option>
              <option value="jp">🇯🇵 日本語</option>
            </select>
          </div>
          <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
            {t.navItems.map((item, idx) => (
              <li className="nav-item" style={{ fontSize: '22px' }} key={idx}>
                <a href={`#${sectionIds[idx]}`} className="nav-link px-3">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="scroll-container">
        {/* Sosial Section */}
        <section id="home" className="container scroll-section text-light">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="welcome-text">{t.welcome}</h5>
              <h2 className="fw-bold mb-3">
                {t.iam} <span className="typing-text">{text}</span>
              </h2>
              <p className="text-muted" style={{ fontSize: '30px' }}>{t.sDesc}</p>
              <div className="d-flex gap-3">
                <a href="https://www.instagram.com/ka.zuxha" className="icon-circle"><i className="bi bi-instagram"></i></a>
                <a href="https://x.com/Ka_zuxha" className="icon-circle"><i className="bi bi-twitter"></i></a>
                <a href="https://github.com/DimasLeo" className="icon-circle"><i className="bi bi-github"></i></a>
                <a href="https://www.linkedin.com/in/dimas-leo-anuggrah-807533353/" className="icon-circle"><i className="bi bi-linkedin"></i></a>
                <a href="https://discord.com/users/684379065716965388" className="icon-circle"><i className="bi bi-discord"></i></a>
                <a href="https://open.spotify.com/user/31mixke3ecmdtosbxvjgcjbau2di?si=8ed937bdef874fa2" className="icon-circle"><i className="bi bi-spotify"></i></a>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
              <div className="blob-bg"></div>
              <img src="/images/Foto1.png" alt="profile" className="profile-img position-relative" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container-fluid about-section scroll-section text-light">
          <div className="row align-items-center">
            <div className="col-md-6 d-flex justify-content-center align-items-center order-md-1 order-2">
              <div className="p-3 about-img-wrapper" style={{ backgroundColor: '#d2b48c' }}>
                <img src="/images/Foto2.png" alt="profile" className="about-img" />
              </div>
            </div>
            <div className="col-md-6 order-md-2 order-1">
              <h2 className="fw-bold mb-3">{t.aboutTitle}</h2>
              <p className="text-muted" style={{ fontSize: '30px' }}>{t.aboutDesc}</p>
              <ul className="list-unstyled text-muted" style={{ fontSize: '25px' }}>
                <li><strong>{t.labels.age}:</strong> {t.labels.bio?.age}</li>
                <li><strong>{t.labels.address}:</strong> {t.labels.bio?.address}</li>
                <li><strong>{t.labels.phone}:</strong> +62 858-7217-4625</li>
                <li><strong>{t.labels.email}:</strong> dimasleo12345@gmail.com</li>
              </ul>
              <a href="/cv.pdf" download className="custom-download-btn mt-3" style={{ color: '#121212', fontSize: '18px' }}>
                {t.cvText}
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="service" className="my-services-section py-5 scroll-section text-light">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">
              <span className="custom-title-color">{t.serviceTitle.split(' ')[0]}</span>{' '}
              <span style={{ color: '#d2b48c' }}>{t.serviceTitle.split(' ')[1]}</span>
            </h2>
            <p className="text-muted" style={{ fontSize: '22px' }}>{t.serviceDesc}</p>
            <div className="divider mx-auto my-3"></div>

            <div className="row justify-content-center mt-4 equal-height">
              {t.services.map((service, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <div className="service-card p-4 text-center">
                    <i className={`bi ${idx === 0 ? "bi-code-slash" : idx === 1 ? "bi-camera" : "bi-laptop"} service-icon mb-3`}></i>
                    <h5 style={{ fontSize: '25px' }}>{service}</h5>
                    <p style={{ fontSize: '23px' }}>{t.serviceDescriptions[idx]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="scroll-section container">
          <GallerySection language={language} />
        </section>

        <section id="contact" className="scroll-section container">
          <ContactSection language={language} />
        </section>
      </main>
    </>
  );
}
