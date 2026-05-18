'use client';

import { useState } from 'react';

export default function PredictionExamsHub() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('KJSEA (Grade 9)');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkoutPaper, setCheckoutPaper] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample structured layout mimicking your Supabase database schema
  const predictionDatabase = [
    {
      id: 'kpsea-math-t2',
      title: 'Grade 6 Mathematics KPSEA National Prediction Paper',
      level: 'KPSEA (Grade 6)',
      term: 'Term 2',
      subject: 'Mathematics',
      code: 'KPSEA-MAT-02'
    },
    {
      id: 'kpsea-sci-t2',
      title: 'Grade 6 Integrated Science KPSEA National Prediction',
      level: 'KPSEA (Grade 6)',
      term: 'Term 2',
      subject: 'Integrated Science',
      code: 'KPSEA-SCI-02'
    },
    {
      id: 'kjsea-sci-t2',
      title: 'Grade 9 Integrated Science KJSEA National Prediction Paper',
      level: 'KJSEA (Grade 9)',
      term: 'Term 2',
      subject: 'Integrated Science',
      code: 'KJSEA-ISC-02'
    },
    {
      id: 'kjsea-kisw-t2',
      title: 'Grade 9 Kiswahili Term 2 Prediction Paper (Lugha na Insha)',
      level: 'KJSEA (Grade 9)',
      term: 'Term 2',
      subject: 'Kiswahili',
      code: 'KJSEA-KIS-02'
    },
    {
      id: 'kcse-math1-t2',
      title: 'KCSE Mathematics Paper 1 National Prediction Benchmark',
      level: 'KCSE (Form 4)',
      term: 'Term 2',
      subject: 'Mathematics P1',
      code: 'KCSE-MAT1-2026'
    },
    {
      id: 'kcse-chem2-t2',
      title: 'KCSE Chemistry Paper 2 National Prediction Blueprint',
      level: 'KCSE (Form 4)',
      term: 'Term 2',
      subject: 'Chemistry P2',
      code: 'KCSE-CHM2-2026'
    }
  ];

  // Filtering documents based on active tier and academic term selections
  const activePapers = predictionDatabase.filter(
    (item) => item.level === selectedLevel && item.term === selectedTerm
  );

  // Smooth scroll helper for navigational flow
  const scrollToId = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handles checkout panel activation
  const handleDownloadInitiation = (paper) => {
    setCheckoutPaper(paper);
  };

  // Simulates standard Safaricom M-Pesa Daraja API STK Push handshake
  const handleMpesaStkPushSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsProcessing(true);
    
    // Simulating API callback processing times
    setTimeout(() => {
      setIsProcessing(false);
      alert(`STK Push initiated successfully to 0${phoneNumber.replace(/^254|^0/, '')}! Please check your handset, enter your M-Pesa PIN to complete the Ksh 100 payment, and your secure download will start automatically.`);
      setCheckoutPaper(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased scroll-smooth">
      {/* 1. PORTAL HEADER & NAVIGATION */}
      <nav className="bg-[#002D62] text-white sticky top-0 z-40 shadow-md border-b-2 border-[#D4AF37] px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 bg-white flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Elevate Kenya Predictions Logo" 
                className="w-10 h-10 object-cover"
              />
            </div>
            <span className="font-black text-xs sm:text-sm tracking-tight uppercase text-white whitespace-nowrap">
              Elevate Kenya Predictions
            </span>
          </div>

          {/* Desktop Navigation Link Deck */}
          <div className="hidden lg:flex items-center space-x-6 font-bold text-xs tracking-wide whitespace-nowrap">
            <a href="/" className="hover:text-[#D4AF37] transition uppercase">Home Page</a>
            <button onClick={() => scrollToId('tiers-hub')} className="text-[#D4AF37] hover:underline uppercase font-black">PREDICTION ARCHIVES</button>
            <button onClick={() => scrollToId('how-it-works')} className="hover:text-[#D4AF37] transition uppercase">PAYMENT GUIDE</button>
            <span className="h-4 w-[1px] bg-white/20 mx-1"></span>
            <button className="bg-transparent border-2 border-[#D4AF37] text-white px-4 py-1.5 rounded-md font-black hover:bg-[#D4AF37] hover:text-[#002D62] transition uppercase text-[11px]">
              My Library
            </button>
          </div>

          {/* Mobile Hamburg Trigger */}
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

        {/* Mobile Dropdown Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#D4AF37]/30 space-y-3 pb-3 font-bold text-xs tracking-wider bg-[#002D62] px-2">
            <a href="/" className="block w-full text-left py-2 px-2 hover:bg-white/5 hover:text-[#D4AF37] rounded transition">Home Page</a>
            <button onClick={() => scrollToId('tiers-hub')} className="block w-full text-left py-2 px-2 text-[#D4AF37] bg-white/5 rounded transition">PREDICTION ARCHIVES</button>
            <button onClick={() => scrollToId('how-it-works')} className="block w-full text-left py-2 px-2 hover:bg-white/5 hover:text-[#D4AF37] rounded transition">PAYMENT GUIDE</button>
          </div>
        )}
      </nav>

      {/* 2. PAGE ENTRY INTRO BANNER */}
      <header className="bg-gradient-to-b from-[#0B3C73] to-[#002D62] text-white py-16 px-4 text-center border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-[#D4AF37] text-[#002D62] font-black text-[10px] tracking-widest px-3 py-1 rounded-full uppercase">Pristine LaTeX Architecture</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-4 leading-tight">
            National Assessment <span className="text-[#D4AF37]">Prediction Papers</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed font-medium">
            Access institutional grade sample models tailored exactly to the KNEC diagnostic testing matrices. Fully downloadable instantly following M-Pesa confirmation.
          </p>
        </div>
      </header>

      {/* 3. CORE EXAM TILES SELECTION DECK */}
      <section id="tiers-hub" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-16">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Step 1: Choose Your Academic Milestone Hub</h2>
          <div className="h-0.5 w-12 bg-[#D4AF37] mt-1.5"></div>
        </div>

        {/* Master Tier Selector Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tag: 'KPSEA (Grade 6)', desc: 'Primary Milestone Hub', emoji: '🎒' },
            { tag: 'KJSEA (Grade 9)', desc: 'Junior School Hub', emoji: '📄' },
            { tag: 'KCSE (Form 4)', desc: 'Senior High Level Hub', emoji: '🏛️' }
          ].map((tier) => (
            <button
              key={tier.tag}
              type="button"
              onClick={() => setSelectedLevel(tier.tag)}
              className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                selectedLevel === tier.tag 
                  ? 'bg-white border-[#002D62] shadow-md ring-2 ring-[#002D62]/10' 
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{tier.emoji}</span>
                <div>
                  <h3 className="font-black text-sm text-[#002D62] uppercase tracking-wide">{tier.tag}</h3>
                  <p className="text-gray-400 text-[11px] font-medium mt-0.5">{tier.desc}</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLevel === tier.tag ? 'border-[#002D62] bg-[#002D62]' : 'border-gray-300'}`}>
                {selectedLevel === tier.tag && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </button>
          ))}
        </div>

        {/* Sub-Filter Terms Alignment */}
        <div className="flex justify-center md:justify-start items-center space-x-2 mt-8 bg-white border border-gray-200 p-2 rounded-xl max-w-sm mx-auto md:mx-0 shadow-sm">
          {['Term 1', 'Term 2', 'Term 3'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setSelectedTerm(term)}
              className={`flex-1 text-center py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition ${
                selectedTerm === term 
                  ? 'bg-[#002D62] text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* 4. DYNAMIC DOCUMENT FOLDERS */}
        <div className="mt-8 border-t border-gray-200/80 pt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
            <div>
              <h3 className="text-base font-black text-[#002D62] uppercase tracking-tight">Active Repositories</h3>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">Displaying secure prediction maps for <span className="text-[#002D62] font-bold">{selectedLevel} • {selectedTerm}</span></p>
            </div>
            <span className="self-start sm:self-center text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2.5 py-1 rounded-md">
              Fee Counter: Ksh 100 Each
            </span>
          </div>

          {activePapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activePapers.map((paper) => (
                <div key={paper.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-bold bg-blue-50 text-[#002D62] border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        {paper.code}
                      </span>
                      <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded tracking-wide">
                        Verified Secure
                      </span>
                    </div>
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug line-clamp-3 min-h-[4rem]">
                      {paper.title}
                    </h4>
                  </div>

                  {/* Payment Action Row */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Standard Cost</p>
                      <p className="font-black text-sm text-gray-900">Ksh 100</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleDownloadInitiation(paper)}
                      className="bg-[#002D62] hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider py-2 px-4 rounded-md transition shadow-sm flex items-center space-x-1"
                    >
                      <span>📥 Download Paper</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl py-12 px-4 text-center max-w-md mx-auto">
              <span className="text-2xl block mb-2">📁</span>
              <p className="text-gray-500 text-xs sm:text-sm font-bold">No predictions mapped under {selectedLevel} for {selectedTerm} yet.</p>
              <p className="text-gray-400 text-[11px] mt-1 font-medium">Please select a different term block or academic tier bracket.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. INTERACTIVE MPESA TRANSACTION OVERLAY PANEL */}
      {checkoutPaper && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all">
            
            {/* Overlay Banner */}
            <div className="bg-[#002D62] text-white p-5 border-b-2 border-[#D4AF37] flex justify-between items-center">
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider text-[#D4AF37]">Secure Document Checkout</h3>
                <p className="text-[10px] text-gray-300 mt-0.5">Safaricom M-Pesa Gateways Handshake Pipeline</p>
              </div>
              <button 
                type="button"
                onClick={() => setCheckoutPaper(null)}
                className="text-white hover:text-[#D4AF37] p-1 rounded-lg hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Document Breakdown Summary */}
            <form onSubmit={handleMpeskStkPushSubmit} className="p-6 space-y-4">
              <div className="bg-[#F4F6F9] border border-gray-200 rounded-xl p-4 text-left">
                <span className="text-[9px] font-black text-white bg-[#002D62] px-2 py-0.5 rounded uppercase tracking-wide">{checkoutPaper.level}</span>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 mt-2.5 leading-snug">{checkoutPaper.title}</h4>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200/80">
                  <span className="text-xs text-gray-500 font-bold">Remittance Fee:</span>
                  <span className="text-xl font-black text-[#002D62]">Ksh 100</span>
                </div>
              </div>

              {/* STK Push Instruction Panel */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-left flex items-start space-x-2.5">
                <span className="text-lg mt-0.5">📱</span>
                <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                  <strong>Instant Handset Verification:</strong> Enter your mobile line below. Upon clicking download, an automated secure push transaction requests your verification. Input your <strong>M-Pesa PIN</strong> on your screen to activate your target Supabase download payload.
                </p>
              </div>

              {/* Number Input Element */}
              <div className="text-left space-y-1.5">
                <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wide">Safaricom Mobile Number Line</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold text-xs sm:text-sm">+254</span>
                  </div>
                  <input
                    type="tel"
                    required
                    pattern="^(7|1)[0-9]{8}$"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="712345678"
                    className="w-full pl-14 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#002D62] focus:ring-1 focus:ring-[#002D62]"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Format layout example: 712345678 or 112345678</p>
              </div>

              {/* Submit Buttons Array */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutPaper(null)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-2 text-white font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg transition shadow-md flex items-center justify-center space-x-2 ${
                    isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25D366] hover:bg-green-600'
                  }`}
                >
                  {isProcessing ? (
                    <span>🔄 Generating Push...</span>
                  ) : (
                    <span>Pay Ksh 100 to Download</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. STEP BY STEP OPERATIVE FLOW DIAGRAM SECTOR */}
      <section id="how-it-works" className="bg-white border-t border-b border-gray-200 py-16 px-4 scroll-mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#002D62] uppercase tracking-tight">How Secure Downloads Work</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">Our automated pipeline securely triggers PDF indicators direct to your system logs instantly.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 text-left">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center font-black text-xs text-[#002D62]">1</div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-tight">Select Assessment</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">Browse our active archives across KPSEA, KJSEA, or KCSE matrices and click download.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center font-black text-xs text-green-700">2</div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-tight">Enter M-Pesa PIN</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">Input your standard number parameters to trigger a secure STK Push directly on your mobile interface.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-50 border border-purple-200 rounded-lg flex items-center justify-center font-black text-xs text-purple-700">3</div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-tight">Instant File Fetch</h4>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">Once authentication hooks resolve, the standard high-fidelity LaTeX evaluation PDF prompts download files immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECURE BRAND CLOSURE FOOTER */}
      <footer className="bg-[#001F42] text-gray-400 text-xs md:text-sm py-8 border-t-4 border-[#D4AF37] px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <p>© 2026 Elevate Kenya Predictions. Connected securely to isolated cloud storage nodes.</p>
          <div className="flex space-x-4 font-bold text-gray-300">
            <a href="/" className="hover:text-[#D4AF37]">BACK TO HOME</a>
            <span>•</span>
            <button onClick={() => scrollToId('tiers-hub')} className="hover:text-[#D4AF37] uppercase">ARCHIVES TOP</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
