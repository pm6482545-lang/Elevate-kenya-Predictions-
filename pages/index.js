import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('KJSEA (Grade 9)');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');

  // Hardcoded premium data matching your database configuration
  const materials = [
    {
      id: 1,
      title: 'Grade 9 Integrated Science Term 2 Prediction Paper',
      category: 'KJSEA (Grade 9)',
      term: 'Term 2',
      price: 'Ksh 100',
      tag: 'New'
    },
    {
      id: 2,
      title: 'Grade 9 Kiswahili Term 2 Prediction Paper',
      category: 'KJSEA (Grade 9)',
      term: 'Term 2',
      price: 'Ksh 100',
      tag: 'New'
    },
    {
      id: 3,
      title: 'Grade 6 Mathematics KPSEA National Prediction',
      category: 'KPSEA (Grade 6)',
      term: 'Term 2',
      price: 'Ksh 150',
      tag: 'Hot'
    },
    {
      id: 4,
      title: 'KCSE Mathematics Paper 1 National Prediction',
      category: 'KCSE (Form 4)',
      term: 'Term 2',
      price: 'Ksh 200',
      tag: 'KCSE 2026'
    }
  ];

  // Filter logic based on the user's active selections
  const filteredMaterials = materials.filter(
    (item) => item.category === activeTab && item.term === selectedTerm
  );

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased scroll-smooth">
      <Head>
        <title>Elevation Pillar | Specialized Science & Mathematics Assessments</title>
        <meta name="description" content="National-standard prediction papers professionally formatted in LaTeX for academic success." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 1. PROFESSIONAL TOP NAVIGATION BAR */}
      <nav className="bg-[#002D62] text-white sticky top-0 z-50 shadow-md border-b-2 border-[#D4AF37] px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo Brand Layout */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 bg-white flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Elevation Pillar Logo" 
                width={40} 
                height={40} 
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-black text-lg tracking-tight uppercase text-white">Elevation Pillar</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 font-bold text-sm tracking-wide">
            <a href="#home" className="hover:text-[#D4AF37] transition">HOME</a>
            <a href="#services" className="hover:text-[#D4AF37] transition">SERVICES</a>
            <a href="#assessments" className="hover:text-[#D4AF37] transition">EXAMS</a>
            <a href="#about" className="hover:text-[#D4AF37] transition">ABOUT</a>
            <button className="text-white hover:text-[#D4AF37] tracking-wider transition uppercase">Sign In</button>
            <button className="bg-transparent border-2 border-[#D4AF37] text-white px-4 py-1.5 rounded-md font-black hover:bg-[#D4AF37] hover:text-[#002D62] tracking-wider transition uppercase">Sign Up</button>
          </div>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded focus:outline-none text-[#D4AF37]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Options */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#D4AF37]/30 space-y-3 pb-2 font-bold text-xs tracking-wider">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">HOME</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">ACADEMIC SERVICES</a>
            <a href="#assessments" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">EXAMS & REVISION</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">ABOUT ME</a>
            <div className="pt-2 border-t border-[#D4AF37]/20 flex space-x-2">
              <button className="w-1/2 border border-white py-2 rounded text-center text-xs uppercase font-black">Sign In</button>
              <button className="w-1/2 bg-[#D4AF37] text-[#002D62] font-black py-2 rounded text-center text-xs uppercase">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. EXACT HERO COVER SCREEN */}
      <header id="home" className="relative bg-gradient-to-b from-[#0B3C73]/90 to-[#002D62]/95 text-white text-center px-4 py-20 md:py-32 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none text-[#D4AF37] uppercase drop-shadow-md">
            Elevation Pillar
          </h1>
          <div className="w-32 h-1 bg-[#D4AF37] my-5 rounded"></div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide max-w-xl italic text-gray-200">
            Striving for the Peak of Potential
          </h2>
          <p className="text-base md:text-lg mt-6 max-w-2xl font-medium text-gray-300 leading-relaxed">
            Specialized Science & Mathematics Assessments for KPSEA, KJSEA, and KCSE
          </p>
          <div className="mt-8 w-full sm:w-auto">
            <a href="#services" className="inline-block w-full sm:w-auto bg-[#D4AF37] text-[#002D62] font-black tracking-wider px-10 py-4 rounded-md shadow-xl hover:bg-yellow-400 text-center transition-all transform hover:-translate-y-0.5 text-sm uppercase">
              Explore Academy
            </a>
          </div>
        </div>
      </header>

      {/* 3. STATIC SERVICES BLOCK (CAROUSEL LOOK - NON-CLICKABLE FOR FILTERING) */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-[#002D62] text-xs font-black uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded">Our Scope</span>
          <h2 className="text-3xl font-black text-[#002D62] mt-3 uppercase tracking-tight">Academic Services</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-md mx-auto">Providing precise, high-fidelity curriculum-aligned structures across Kenyan thresholds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Lower Primary Block */}
          <div className="bg-white rounded-xl overflow-hidden border-t-4 border-[#002D62] shadow-sm p-6 text-center flex flex-col items-center justify-between min-h-[260px]">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-2xl shadow-inner">🎒</div>
            <div className="mt-4">
              <h4 className="font-extrabold text-[#002D62] text-lg uppercase tracking-tight">Lower Primary</h4>
              <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed">Contains structured learning layouts and assessments for Playgroup up to Grade 3.</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Foundation Tier</span>
            </div>
          </div>

          {/* Upper Primary Block */}
          <div className="bg-white rounded-xl overflow-hidden border-t-4 border-[#002D62] shadow-sm p-6 text-center flex flex-col items-center justify-between min-h-[260px]">
            <div className="w-14 h-14 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center text-2xl shadow-inner">📚</div>
            <div className="mt-4">
              <h4 className="font-extrabold text-[#002D62] text-lg uppercase tracking-tight">Upper Primary</h4>
              <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed">Contains national benchmark preparation layouts from Grade 4 to Grade 6 packages.</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Intermediate Tier</span>
            </div>
          </div>

          {/* KPSEA & KJSEA Block */}
          <div className="bg-white rounded-xl overflow-hidden border-t-4 border-[#D4AF37] shadow-md p-6 text-center flex flex-col items-center justify-between min-h-[260px]">
            <div className="w-14 h-14 bg-yellow-50 text-[#002D62] rounded-full flex items-center justify-center text-2xl shadow-inner">📄</div>
            <div className="mt-4">
              <h4 className="font-extrabold text-[#002D62] text-lg uppercase tracking-tight">KPSEA & KJSEA</h4>
              <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed">National-standard prediction papers (Questions 1-50) professionally formatted in LaTeX for junior school success.</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <span className="text-[11px] uppercase tracking-wider font-black text-[#D4AF37]">Premium Core</span>
            </div>
          </div>

          {/* Science & Math Secondary Block */}
          <div className="bg-white rounded-xl overflow-hidden border-t-4 border-[#002D62] shadow-sm p-6 text-center flex flex-col items-center justify-between min-h-[260px]">
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-2xl shadow-inner">🔬</div>
            <div className="mt-4">
              <h4 className="font-extrabold text-[#002D62] text-lg uppercase tracking-tight">Science & Math</h4>
              <p className="text-gray-500 text-xs mt-2 font-medium leading-relaxed">Expertly crafted resources for secondary exams, designed to simplify complex concepts and elevate grades.</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-100 mt-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">High School Tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTUAL DYNAMIC ASSESSMENTS PORTAL */}
      <section id="assessments" className="bg-white border-t border-b border-gray-200/60 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#002D62] uppercase tracking-tight">Specific Assessment Papers</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Select your exam series and matching term block to generate active item streams.</p>
          </div>

          {/* Tab Filter Deck */}
          <div className="bg-gray-100 p-1.5 rounded-xl flex items-center overflow-x-auto gap-1 shadow-inner no-scrollbar">
            {['KJSEA (Grade 9)', 'KPSEA (Grade 6)', 'KCSE (Form 4)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#002D62] text-white shadow'
                    : 'text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sub-Filters for Terms */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {['Term 1', 'Term 2', 'Term 3'].map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${
                  selectedTerm === term
                    ? 'bg-green-50 text-green-700 border-green-300 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Live Data Grid Rendering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((paper) => (
                <div key={paper.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-50 text-[#002D62] font-black text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-blue-100">
                        {paper.category}
                      </span>
                      <span className="bg-red-50 text-red-600 font-black text-[10px] uppercase px-2 py-0.5 rounded tracking-wide animate-pulse">
                        {paper.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base leading-snug line-clamp-3 min-h-[4.5rem]">
                      {paper.title}
                    </h4>
                  </div>
                  <div className="p-5 pt-0 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Price</p>
                      <p className="font-black text-base text-gray-900">{paper.price}</p>
                    </div>
                    <button className="bg-[#002D62] text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-md hover:bg-blue-800 transition shadow-sm">
                      Unlock Paper
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white text-center py-12 rounded-xl border-2 border-dashed border-gray-200 p-6">
                <p className="text-gray-400 text-xs md:text-sm font-bold">No exam matching {selectedTerm} listed inside this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. ABOUT FOUNDER SECTION */}
      <section id="about" className="max-w-5xl mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 relative rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ring-[#002D62] bg-gray-100">
            <Image 
              src="/peter.png" 
              alt="Peter Musau - Founder" 
              width={200} 
              height={200} 
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-[#002D62] uppercase tracking-tight mb-3">Meet the Founder</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              Founded by Peter Musau, Elevation Pillar is dedicated to simplifying academic excellence. I lead a technical team of curriculum evaluation specialists who develop pristine predictive frameworks. We ensure schools, teachers, and candidates across Kenya gain access to highly precise, reliable, and LaTeX-formatted assessment assets that guarantee exceptional national performance indices.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BRAND FOOTER WITH ACTIONS/ROUTER SUPPORT FOR MEDIAS */}
      <footer className="bg-[#001F42] text-gray-400 text-xs md:text-sm pt-12 pb-6 border-t-4 border-[#D4AF37] px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Footer Logo" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h4 className="text-white font-black text-sm uppercase tracking-wider">Elevation Pillar</h4>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-gray-400">
              Integrating rigorous academic assessment design and structured evaluation assets for specialized metrics.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[#D4AF37] font-black text-xs md:text-sm uppercase tracking-widest mb-4">Communication Support</h4>
            <p className="text-xs mb-2 font-medium text-gray-300">📍 Likoni, Mombasa, Kenya</p>
            <p className="text-xs mb-2 font-medium text-gray-300">✉️ Support: pm6482545@gmail.com</p>
            <p className="text-xs font-medium text-gray-300">🏢 Elevation Pillar Academy | Mombasa, Kenya</p>
          </div>

          {/* Social Channels Configured as High-Visibility Functional Buttons */}
          <div>
            <h4 className="text-[#D4AF37] font-black text-xs md:text-sm uppercase tracking-widest mb-4">Official Channels</h4>
            <div className="flex flex-col space-y-2 max-w-xs">
              <button 
                onClick={() => window.open('https://wa.me/254746357349', '_blank')}
                className="w-full bg-[#25D366] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-green-600 transition text-left flex items-center space-x-2"
              >
                <span>💬 Connect on WhatsApp</span>
              </button>
              <button 
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61582117877169', '_blank')}
                className="w-full bg-[#1877F2] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-blue-700 transition text-left flex items-center space-x-2"
              >
                <span>📘 Visit Official Facebook</span>
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/peter-musau-01a533407', '_blank')}
                className="w-full bg-[#0077B5] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-blue-800 transition text-left flex items-center space-x-2"
              >
                <span>🔗 View Professional LinkedIn</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copy Deck */}
        <div className="max-w-6xl mx-auto pt-6 text-center text-[11px] text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Elevation Pillar. Built for Global Excellence.</p>
          <p className="italic text-[#D4AF37]/70 font-medium">"Striving for the Peak of Potential"</p>
        </div>
      </footer>
    </div>
  );
}
