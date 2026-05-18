import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Core Categories architecture with built-in visual icon setups
  const categories = [
    { id: 'All', name: 'All Materials' },
    { id: 'Lower Primary', name: 'Lower Primary (PP1 - G3)', emoji: '🎒', bg: 'bg-orange-100 text-orange-700' },
    { id: 'Upper Primary', name: 'Upper Primary (G4 - G6)', emoji: '📚', bg: 'bg-blue-100 text-blue-700' },
    { id: 'Junior School', name: 'Junior School (G7 - G9)', emoji: '🔬', bg: 'bg-purple-100 text-purple-700' },
    { id: 'Senior School', name: 'Senior School', emoji: '📐', bg: 'bg-amber-100 text-amber-700' },
    { id: 'Predictions', name: 'National Predictions', emoji: '🏆', bg: 'bg-red-100 text-red-700' }
  ];

  // Live premium assessment arrays
  const materials = [
    {
      id: 1,
      title: 'Grade 9 Integrated Science Term 2 Prediction Paper',
      category: 'Junior School',
      subCategory: 'KJSEA (Grade 9)',
      price: 'Ksh 100',
      tag: 'Term 2'
    },
    {
      id: 2,
      title: 'Grade 9 Kiswahili Term 2 Prediction Paper',
      category: 'Junior School',
      subCategory: 'KJSEA (Grade 9)',
      price: 'Ksh 100',
      tag: 'Term 2'
    },
    {
      id: 3,
      title: 'Grade 6 Mathematics KPSEA National Prediction',
      category: 'Predictions',
      subCategory: 'KPSEA (Grade 6)',
      price: 'Ksh 150',
      tag: 'Hot'
    },
    {
      id: 4,
      title: 'KCSE Mathematics Paper 1 National Prediction',
      category: 'Predictions',
      subCategory: 'KCSE (Form 4)',
      price: 'Ksh 200',
      tag: 'KCSE 2026'
    }
  ];

  const filteredMaterials = activeCategory === 'All' 
    ? materials 
    : materials.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans scroll-smooth">
      <Head>
        <title>Elevate Kenya Predictions | Professional Academic Assessments</title>
        <meta name="description" content="National Assessment Specialists providing reliable Science, Mathematics, and CBC revision materials." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-[#005A2B] text-white sticky top-0 z-50 shadow-md px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo Brand Layout */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 bg-white flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Elevate Kenya Logo" 
                width={40} 
                height={40} 
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase">Elevate Kenya</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-medium">
            <a href="#home" className="hover:text-green-300 transition">Home</a>
            <a href="#materials" className="hover:text-green-300 transition">Exams</a>
            <a href="#about" className="hover:text-green-300 transition">About</a>
            <a href="#contacts" className="hover:text-green-300 transition">Contact</a>
            <button className="border border-white px-4 py-1.5 rounded-full hover:bg-white hover:text-[#005A2B] transition">Log In</button>
            <button className="bg-yellow-500 text-gray-900 px-4 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition">Sign Up</button>
          </div>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Options */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-green-700 space-y-3 pb-2">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-green-300">Home</a>
            <a href="#materials" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-green-300">Exams & Revision Materials</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-green-300">About Us</a>
            <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-green-300">Contact & Support</a>
            <div className="pt-2 border-t border-green-700 flex space-x-2">
              <button className="w-1/2 border border-white py-2 rounded-lg text-sm text-center">Log In</button>
              <button className="w-1/2 bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg text-sm text-center">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <header id="home" className="bg-gradient-to-b from-[#005A2B] to-[#00401E] text-white text-center px-4 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <span className="bg-green-700 text-green-200 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            National CBC Assessment Specialists
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight leading-tight">
            Unlock Academic Excellence in Kenya
          </h1>
          <p className="text-green-100 text-base md:text-lg mt-4 max-w-2xl mx-auto font-light">
            Welcome to Elevate Kenya Predictions. We provide premium, curriculum-aligned prediction layouts and structured mock assessment assets across all Kenyan evaluation thresholds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">
            <a href="#materials" className="w-full sm:w-auto bg-yellow-500 text-gray-900 font-extrabold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-400 text-center transition">
              Explore Revision Materials
            </a>
            <a href="https://wa.me/254746357349" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-transparent border-2 border-white/60 font-medium px-6 py-3 rounded-xl hover:bg-white/10 text-center transition">
              WhatsApp Contact
            </a>
          </div>
        </div>
      </header>

      {/* 3. CATEGORIES CARDS GRID (FIXED INLINE DESIGN - NO OUTSIDE IMAGES REQUIRED) */}
      <section id="materials" className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Exams and Revision Materials</h2>
          <p className="text-gray-600 text-sm mt-1">Select a core level block to review specialized evaluation assets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.slice(1).map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById('exampapers')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm text-center flex flex-col justify-between hover:border-green-600 hover:shadow-md transition cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.bg} mx-auto flex items-center justify-center text-3xl shadow-inner mb-4 group-hover:scale-110 transition`}>
                {cat.emoji}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base leading-snug">{cat.name}</h4>
                <span className="inline-block mt-3 text-[#005A2B] font-bold text-xs group-hover:underline">
                  Open Category &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FILTER INTERFACE PAPERS GRID */}
      <section id="exampapers" className="bg-white py-12 px-4 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-black text-gray-900">Available Assessment Lists</h2>
            <p className="text-gray-600 text-sm mt-1">Use the navigation tabs below to swap item lists instantly.</p>
          </div>

          {/* Filtering Layout tabs */}
          <div className="flex overflow-x-auto pb-3 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#005A2B] text-white scale-105 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Cards Interface Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((paper) => (
                <div key={paper.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-green-50 text-[#005A2B] font-bold text-[11px] px-2.5 py-1 rounded-md border border-green-100">
                        {paper.subCategory}
                      </span>
                      <span className="bg-red-50 text-red-600 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded animate-pulse">
                        {paper.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 line-clamp-3 text-sm md:text-base min-h-[4.5rem]">
                      {paper.title}
                    </h4>
                  </div>
                  <div className="p-5 pt-0 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Price</p>
                      <p className="font-black text-base md:text-lg text-gray-900">{paper.price}</p>
                    </div>
                    <button className="bg-[#005A2B] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-green-700 transition shadow-sm">
                      Unlock Paper
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white text-center py-12 rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-sm font-medium">No materials listed under this specific level selection segment yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. ABOUT US AND PROFILE PICTURE SECTION */}
      <section id="about" className="bg-white border-t border-b border-gray-200/70 py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-44 h-44 md:w-52 md:h-52 flex-shrink-0 relative rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ring-[#005A2B] bg-gray-100">
            <Image 
              src="/peter.png" 
              alt="Peter Musau - Founder" 
              width={220} 
              height={220} 
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Meet the Founder: Peter Musau</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-normal">
              Founded by Peter Musau, Elevate Kenya Predictions is dedicated to simplifying academic excellence. I lead a dedicated team of expert curriculum assessment specialists who develop pristine predictive items. We ensure teachers, schools, and candidates across Kenya have access to premium, reliable, and curriculum-aligned evaluation packages, paving the way for exceptional performance.
            </p>
          </div>
        </div>
      </section>

      {/* 6. COMPREHENSIVE LINKS FOOTER */}
      <footer id="contacts" className="bg-gray-900 text-gray-400 text-xs md:text-sm pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="EKP Logo" 
                  width={30} 
                  height={30} 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h4 className="text-white font-bold text-base uppercase tracking-tight">Elevate Kenya</h4>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-gray-400">
              Providing exceptional science, mathematics, and comprehensive level predictive resources for Kenyan national standards.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3">Support & Communication</h4>
            <p className="text-xs mb-2">📍 Likoni, Mombasa, Kenya</p>
            <p className="text-xs mb-2">☎️ Mobile: +254 746 357 349</p>
            <p className="text-xs">✉️ Support: peter@elevatekenyapredictions.vercel.app</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-3">Follow & Connect</h4>
            <div className="flex flex-col space-y-2.5">
              <a href="https://wa.me/254746357349" target="_blank" rel="noreferrer" className="text-green-400 hover:underline text-xs flex items-center">
                💬 WhatsApp Support Chat
              </a>
              <a href="https://www.linkedin.com/in/peter-musau-01a533407" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-xs flex items-center">
                🔗 Professional LinkedIn Profile
              </a>
              <a href="https://www.facebook.com/profile.php?id=61582117877169" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs flex items-center">
                📘 Official Facebook Page
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Elevate Kenya Predictions. All Rights Reserved.</p>
          <p className="italic">Elevating academic standards, one predictive paper at a time.</p>
        </div>
      </footer>
    </div>
  );
}
