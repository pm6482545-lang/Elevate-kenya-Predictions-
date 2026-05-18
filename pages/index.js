import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('KJSEA (Grade 9)');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');

  // National exam prediction lists
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

  const filteredMaterials = materials.filter(
    (item) => item.category === activeTab && item.term === selectedTerm
  );

  // Helper functions to handle the big academic service buttons
  const handleServiceClick = (targetGrade) => {
    setActiveTab(targetGrade);
    const element = document.getElementById('assessments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased scroll-smooth">
      <Head>
        <title>Elevate Kenya Predictions | Striving for the Peak of Potential</title>
        <meta name="description" content="National-standard prediction papers professionally formatted in LaTeX for academic success." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-[#002D62] text-white sticky top-0 z-50 shadow-md border-b-2 border-[#D4AF37] px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 bg-white flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Elevate Kenya Predictions Logo" 
                width={40} 
                height={40} 
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-black text-sm md:text-base tracking-tight uppercase text-white">Elevate Kenya Predictions</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-bold text-xs tracking-wide">
            <a href="#home" className="hover:text-[#D4AF37] transition">HOME</a>
            <a href="#services" className="hover:text-[#D4AF37] transition">ACADEMIC SERVICES</a>
            <a href="#assessments" className="hover:text-[#D4AF37] transition">EXAMS</a>
            <a href="#about" className="hover:text-[#D4AF37] transition">ABOUT ME</a>
            <button className="text-white hover:text-[#D4AF37] transition uppercase">Sign In</button>
            <button className="bg-transparent border-2 border-[#D4AF37] text-white px-4 py-1.5 rounded-md font-black hover:bg-[#D4AF37] hover:text-[#002D62] transition uppercase">Sign Up</button>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#D4AF37]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#D4AF37]/30 space-y-3 pb-2 font-bold text-xs tracking-wider">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">HOME</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">ACADEMIC SERVICES</a>
            <a href="#assessments" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">EXAMS</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#D4AF37]">ABOUT ME</a>
          </div>
        )}
      </nav>

      {/* 2. HERO COVER SCREEN */}
      <header id="home" className="relative bg-gradient-to-b from-[#0B3C73]/95 to-[#002D62]/100 text-white text-center px-4 py-24 md:py-36 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-15"></div>
        
        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-[#D4AF37] uppercase drop-shadow-md">
            Elevate Kenya Predictions
          </h1>
          <div className="w-32 h-1 bg-[#D4AF37] my-6 rounded"></div>
          <h2 className="text-xl md:text-2xl font-bold tracking-wide max-w-xl italic text-gray-200">
            "Striving for the peak of potential"
          </h2>
          <p className="text-sm md:text-base mt-4 max-w-xl font-medium text-gray-300 leading-relaxed">
            Specialized Science & Mathematics National Assessment Solutions for KPSEA, KJSEA, and KCSE Thresholds.
          </p>
          <div className="mt-8 w-full sm:w-auto">
            <a href="#services" className="inline-block w-full sm:w-auto bg-[#D4AF37] text-[#002D62] font-black tracking-wider px-10 py-4 rounded-md shadow-xl hover:bg-yellow-400 text-center transition-all text-sm uppercase">
              Explore Services
            </a>
          </div>
        </div>
      </header>

      {/* 3. ACADEMIC SERVICES (BIG ACTION TILES / BUTTONS) */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-[#002D62] text-xs font-black uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded">Curriculum Scope</span>
          <h2 className="text-3xl font-black text-[#002D62] mt-3 uppercase tracking-tight">Academic Services</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Click on any academic level tile to open and filter their respective assessment grids below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Lower Primary Button */}
          <button 
            onClick={() => handleServiceClick('KPSEA (Grade 6)')}
            className="group bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-[#002D62] p-6 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎒</div>
            <div className="my-3">
              <h4 className="font-extrabold text-[#002D62] text-base uppercase tracking-tight">Lower Primary</h4>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">Foundational diagnostic layouts covering assessments from Playgroup up to Grade 3.</p>
            </div>
            <span className="text-[11px] font-black tracking-wider text-[#002D62] bg-blue-50 px-4 py-1.5 rounded-md uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Open Grades →
            </span>
          </button>

          {/* Upper Primary Button */}
          <button 
            onClick={() => handleServiceClick('KPSEA (Grade 6)')}
            className="group bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-[#002D62] p-6 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="w-14 h-14 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
            <div className="my-3">
              <h4 className="font-extrabold text-[#002D62] text-base uppercase tracking-tight">Upper Primary</h4>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">National intermediate standard prediction frameworks across Grade 4 to Grade 6 setup blocks.</p>
            </div>
            <span className="text-[11px] font-black tracking-wider text-[#002D62] bg-blue-50 px-4 py-1.5 rounded-md uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Open Grades →
            </span>
          </button>

          {/* KPSEA & KJSEA Button */}
          <button 
            onClick={() => handleServiceClick('KJSEA (Grade 9)')}
            className="group bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-[#D4AF37] p-6 text-center flex flex-col items-center justify-between min-h-[250px] shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 w-full ring-2 ring-[#D4AF37]/20"
          >
            <div className="w-14 h-14 bg-yellow-50 text-[#002D62] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📄</div>
            <div className="my-3">
              <h4 className="font-extrabold text-[#002D62] text-base uppercase tracking-tight">KPSEA & KJSEA</h4>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">Comprehensive prediction materials (Questions 1-50) typeset cleanly in LaTeX for peak results.</p>
            </div>
            <span className="text-[11px] font-black tracking-wider text-[#002D62] bg-[#D4AF37]/20 px-4 py-1.5 rounded-md uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Open Grades →
            </span>
          </button>

          {/* Science & Math Button */}
          <button 
            onClick={() => handleServiceClick('KCSE (Form 4)')}
            className="group bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-[#002D62] p-6 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full"
          >
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🔬</div>
            <div className="my-3">
              <h4 className="font-extrabold text-[#002D62] text-base uppercase tracking-tight">Science & Math</h4>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">Expert high school tier assessment scripts built to master calculations and evaluation structures.</p>
            </div>
            <span className="text-[11px] font-black tracking-wider text-[#002D62] bg-blue-50 px-4 py-1.5 rounded-md uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Open Grades →
            </span>
          </button>
        </div>
      </section>

      {/* 4. DYNAMIC FILTERABLE ASSESSMENT PORTAL */}
      <section id="assessments" className="bg-white border-t border-b border-gray-200/60 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#002D62] uppercase tracking-tight">Assessment Papers</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Filter active sets using categories below or matching the action buttons above.</p>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 p-1.5 rounded-xl flex items-center overflow-x-auto gap-1 shadow-inner no-scrollbar">
            {['KJSEA (Grade 9)', 'KPSEA (Grade 6)', 'KCSE (Form 4)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab ? 'bg-[#002D62] text-white shadow' : 'text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sub-Filters */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {['Term 1', 'Term 2', 'Term 3'].map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${
                  selectedTerm === term ? 'bg-green-50 text-green-700 border-green-300 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((paper) => (
                <div key={paper.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-50 text-[#002D62] font-black text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-blue-100">
                        {paper.category}
                      </span>
                      <span className="bg-red-50 text-red-600 font-black text-[10px] uppercase px-2 py-0.5 rounded tracking-wide">
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
                <p className="text-gray-400 text-xs md:text-sm font-bold">No prediction items listed for this target selection block yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. PROFESSIONAL EXECUTIVE ABOUT SECTION */}
      <section id="about" className="max-w-4xl mx-auto py-20 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 md:w-44 md:h-44 flex-shrink-0 relative rounded-full overflow-hidden shadow-md border-4 border-white ring-4 ring-[#002D62] bg-gray-50">
            <Image 
              src="/peter.png" 
              alt="Peter Musau - Lead Developer" 
              width={180} 
              height={180} 
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-[#D4AF37] font-black text-xs uppercase tracking-widest bg-[#002D62] px-3 py-1 rounded">Founder Profile</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#002D62] uppercase tracking-tight mt-3 mb-4">Peter Musau Mutua</h2>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto md:mx-0 mb-4 rounded"></div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
              As a STEM educator and developer, I founded Elevate Kenya Predictions to bridge academic assessment formatting gaps across schools nationwide. Backed by a high-caliber framework built around pristine LaTeX code configurations, our platform equips instructors, institutions, and candidates with accurate predictive indicators to maximize score indices during national evaluation intervals.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BRAND FOOTER WITH EXACT SOCIAL CHANNELS ACTION BUTTONS */}
      <footer className="bg-[#001F42] text-gray-400 text-xs md:text-sm pt-12 pb-6 border-t-4 border-[#D4AF37] px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Elevate Kenya Footer Logo" 
                  width={32} 
                  height={32} 
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h4 className="text-white font-black text-sm uppercase tracking-wider">Elevate Kenya</h4>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-gray-400">
              Transforming test preparation with standard, highly precise evaluation resources for specialized education metrics.
            </p>
          </div>

          {/* Communications Col */}
          <div>
            <h4 className="text-[#D4AF37] font-black text-xs md:text-sm uppercase tracking-widest mb-4">Contact Info</h4>
            <p className="text-xs mb-2 font-medium text-gray-300">📍 Likoni, Mombasa, Kenya</p>
            <p className="text-xs mb-2 font-medium text-gray-300">✉️ Email: pm6482545@gmail.com</p>
            <p className="text-xs font-medium text-gray-300">🏫 Elevate Kenya Prediction Hub</p>
          </div>

          {/* Direct Channels Button Array */}
          <div>
            <h4 className="text-[#D4AF37] font-black text-xs md:text-sm uppercase tracking-widest mb-4">Official Channels</h4>
            <div className="flex flex-col space-y-2.5 max-w-xs">
              
              {/* WhatsApp Button */}
              <button 
                onClick={() => window.open('https://wa.me/254746357349', '_blank')}
                className="w-full bg-[#25D366] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-green-600 transition flex items-center justify-center space-x-2"
              >
                <span>💬 WhatsApp Support</span>
              </button>

              {/* Facebook Button */}
              <button 
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61582117877169', '_blank')}
                className="w-full bg-[#1877F2] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <span>📘 Facebook Page</span>
              </button>

              {/* LinkedIn Button */}
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/peter-musau-01a533407', '_blank')}
                className="w-full bg-[#0077B5] text-white font-black text-[11px] uppercase tracking-wider py-2.5 px-4 rounded shadow-sm hover:bg-blue-800 transition flex items-center justify-center space-x-2"
              >
                <span>🔗 LinkedIn Profile</span>
              </button>

            </div>
          </div>
        </div>

        {/* Closing Attribution Deck */}
        <div className="max-w-6xl mx-auto pt-6 text-center text-[11px] text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Elevate Kenya Predictions. All Rights Reserved.</p>
          <p className="italic text-[#D4AF37]/70 font-semibold uppercase tracking-wider">"Striving for the peak of potential"</p>
        </div>
      </footer>
    </div>
  );
}
