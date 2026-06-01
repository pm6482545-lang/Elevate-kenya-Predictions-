'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Smooth scroll handler for anchor sections on the same page
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased scroll-smooth">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="bg-[#002D62] text-white sticky top-0 z-50 shadow-md border-b-2 border-[#D4AF37] px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
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
            <span className="font-black text-xs sm:text-sm tracking-tight uppercase text-white whitespace-nowrap">
              Elevate Kenya Predictions
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-5 font-bold text-xs tracking-wide whitespace-nowrap">
            <button onClick={() => scrollToSection('home')} className="hover:text-[#D4AF37] transition uppercase">HOME</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#D4AF37] transition uppercase">REVISION MATERIALS</button>
            <button onClick={() => router.push('/prediction-exams')} className="text-[#D4AF37] hover:underline transition uppercase font-black tracking-wider">EXAMS 🎯</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#D4AF37] transition uppercase">ABOUT ME</button>
            <span className="h-4 w-[1px] bg-white/20 mx-1"></span>
            {/* UPDATED TO ROUTE TO YOUR NEW LOGIN FOLDER */}
            <button onClick={() => router.push('/login')} className="text-white hover:text-[#D4AF37] transition uppercase">Sign In</button>
            <button onClick={() => router.push('/login')} className="bg-transparent border-2 border-[#D4AF37] text-white px-3 py-1.5 rounded-md font-black hover:bg-[#D4AF37] hover:text-[#002D62] transition uppercase">Sign Up</button>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-[#D4AF37] focus:outline-none">
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
          <div className="lg:hidden mt-3 pt-3 border-t border-[#D4AF37]/30 space-y-3 pb-3 font-bold text-xs tracking-wider bg-[#002D62] px-2">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-1.5 px-2 hover:bg-white/5 hover:text-[#D4AF37] rounded transition">HOME</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-1.5 px-2 hover:bg-white/5 hover:text-[#D4AF37] rounded transition">REVISION MATERIALS</button>
            <button onClick={() => { setIsMenuOpen(false); router.push('/prediction-exams'); }} className="block w-full text-left py-1.5 px-2 text-[#D4AF37] bg-white/10 rounded transition font-black">EXAMS 🎯</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-1.5 px-2 hover:bg-white/5 hover:text-[#D4AF37] rounded transition">ABOUT ME</button>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              {/* UPDATED MOBILE SIDEBAR TO ROUTE TO YOUR LOGIN FOLDER */}
              <button onClick={() => { setIsMenuOpen(false); router.push('/login'); }} className="w-full text-center py-2 bg-white/10 text-white rounded font-bold uppercase tracking-wider">Sign In</button>
              <button onClick={() => { setIsMenuOpen(false); router.push('/login'); }} className="w-full text-center py-2 bg-[#D4AF37] text-[#002D62] rounded font-black uppercase tracking-wider">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO COVER SCREEN */}
      <header id="home" className="relative bg-[#002D62] text-white text-center px-4 py-24 md:py-36 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C73]/95 to-[#002D62]/100 z-0"></div>
        
        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight text-[#D4AF37] uppercase drop-shadow-md px-2">
            Elevate Kenya Predictions
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-[#D4AF37] my-6 rounded"></div>
          <h2 className="text-lg md:text-2xl font-bold tracking-wide max-w-xl italic text-gray-200 px-4">
            "Striving for the peak of potential"
          </h2>
          <p className="text-xs sm:text-sm md:text-base mt-4 max-w-xl font-medium text-gray-300 leading-relaxed px-4">
            Specialized National Assessment Solutions for Primary, Junior School, and Senior High School Metrics.
          </p>
          <div className="mt-8 w-full sm:w-auto px-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollToSection('services')} className="inline-block w-full sm:w-auto bg-[#D4AF37] text-[#002D62] font-black tracking-wider px-10 py-4 rounded-md shadow-xl hover:bg-yellow-400 text-center transition-all text-sm uppercase">
              Explore Resources
            </button>
            <button onClick={() => router.push('/prediction-exams')} className="inline-block w-full sm:w-auto bg-transparent border-2 border-white text-white font-black tracking-wider px-8 py-4 rounded-md shadow-xl hover:bg-white/10 text-center transition-all text-sm uppercase">
              View Prediction Papers 🎯
            </button>
          </div>
        </div>
      </header>

      {/* 3. REVISION MATERIALS & ACADEMIC TILES SEGMENT */}
      <section id="services" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-12">
        <div className="text-center mb-12">
          <span className="text-[#002D62] text-xs font-black uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded">Curriculum Scope</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002D62] mt-3 uppercase tracking-tight">Revision Materials</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-2 max-w-md mx-auto">Access complete structured curriculum bundles and diagnostic indicators updated to modern standards.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Lower Primary Card */}
          <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#002D62] p-5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎒</div>
            <div className="my-2">
              <h4 className="font-extrabold text-[#002D62] text-sm uppercase tracking-tight">Lower Primary</h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">Foundational diagnostic matrices from Playgroup up to Grade 3 tiers.</p>
            </div>
            <button onClick={() => router.push('/lower-primary')} className="w-full text-[10px] font-black tracking-wider text-[#002D62] bg-blue-50 py-2 rounded uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Access Materials
            </button>
          </div>

          {/* Upper Primary Card */}
          <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#002D62] p-5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full">
            <div className="w-12 h-12 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📚</div>
            <div className="my-2">
              <h4 className="font-extrabold text-[#002D62] text-sm uppercase tracking-tight">Upper Primary</h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">Intermediate curriculum objectives aligned for Grade 4 to Grade 6 setups.</p>
            </div>
            <button onClick={() => router.push('/upper-primary')} className="w-full text-[10px] font-black tracking-wider text-[#002D62] bg-blue-50 py-2 rounded uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Access Materials
            </button>
          </div>

          {/* Junior School Card */}
          <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#002D62] p-5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full">
            <div className="w-12 h-12 bg-yellow-50 text-[#002D62] rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📄</div>
            <div className="my-2">
              <h4 className="font-extrabold text-[#002D62] text-sm uppercase tracking-tight">Junior School</h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">Comprehensive tracking sets tailored cleanly for Grade 7 through Grade 9 nodes.</p>
            </div>
            <button onClick={() => router.push('/junior-school')} className="w-full text-[10px] font-black tracking-wider text-[#002D62] bg-blue-50 py-2 rounded uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Access Materials
            </button>
          </div>

          {/* Senior School Card */}
          <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#002D62] p-5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 w-full">
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🏛️</div>
            <div className="my-2">
              <h4 className="font-extrabold text-[#002D62] text-sm uppercase tracking-tight">Senior School</h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">Form 1 to Form 4 high-school level resources targeting key milestones.</p>
            </div>
            <button onClick={() => router.push('/senior-school')} className="w-full text-[10px] font-black tracking-wider text-[#002D62] bg-blue-50 py-2 rounded uppercase group-hover:bg-[#002D62] group-hover:text-white transition-colors">
              Access Materials
            </button>
          </div>

          {/* Prediction Exams Card (id updated to avoid route naming conflict) */}
          <div id="prediction-card" className="group bg-white rounded-xl overflow-hidden border-2 border-[#D4AF37] p-5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 w-full ring-4 ring-[#D4AF37]/10 scroll-mt-24">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎯</div>
            <div className="my-2">
              <h4 className="font-extrabold text-[#002D62] text-sm uppercase tracking-tight">Prediction Exams</h4>
              <p className="text-gray-400 text-[11px] mt-1.5 leading-relaxed">Pristine national-benchmark prediction models mapped using flawless LaTeX layout configurations.</p>
            </div>
            <button 
              onClick={() => router.push('/prediction-exams')}
              className="w-full text-[10px] font-black tracking-wider text-white bg-[#002D62] py-2 rounded uppercase group-hover:bg-[#D4AF37] group-hover:text-[#002D62] transition-all shadow"
            >
              Access Materials
            </button>
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL EXECUTIVE ABOUT SECTION */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-4 scroll-mt-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-36 h-36 md:w-44 md:h-44 flex-shrink-0 relative rounded-full overflow-hidden shadow-md border-4 border-white ring-4 ring-[#002D62] bg-gray-50">
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
            <span className="inline-block text-[#D4AF37] font-black text-xs uppercase tracking-widest bg-[#002D62] px-3 py-1 rounded">Founder Profile</span>
            <h2 className="text-2xl font-black text-[#002D62] uppercase tracking-tight mt-3 mb-3">Peter Musau Mutua</h2>
            <div className="h-1 w-16 bg-[#D4AF37] mx-auto md:mx-0 mb-4 rounded"></div>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              As a STEM educator and developer, I founded Elevate Kenya Predictions to bridge academic assessment formatting gaps across schools nationwide. Backed by a high-caliber framework built around pristine LaTeX code configurations, our platform equips instructors, institutions, and candidates with accurate predictive indicators to maximize score indices during national evaluation intervals.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BRAND FOOTER WITH EXACT SOCIAL CHANNELS ACTION BUTTONS */}
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
            <div className="space-y-2 text-xs font-medium text-gray-300">
              <p>📍 Likoni, Mombasa, Kenya</p>
              <p>✉️ Email: pm6482545@gmail.com</p>
              <p>🏫 Elevate Kenya Prediction Hub</p>
            </div>
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
