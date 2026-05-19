'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize connection to your automated Supabase architecture
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PredictionExamsPage() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState('KPSEA');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // STK Push state trackers
  const [checkoutPaper, setCheckoutPaper] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const examTypes = ['KPSEA', 'KJSEA', 'KCSE'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  // Automatically fetch papers when tier, grade, or term filters alter
  useEffect(() => {
    const fetchAutomatedPapers = async () => {
      setLoading(true);
      setCheckoutPaper(null);
      setPaymentStatus('');
      try {
        const { data, error } = await supabase
          .from('exams')
          .select('*')
          .eq('school_tier', 'prediction exams')
          .eq('grade_class', selectedExam)
          .eq('term', selectedTerm)
          .order('is_premium', { ascending: false }) // 🔥 Paid files always bubble to the top
          .order('subject', { ascending: true });

        if (error) throw error;
        setPapers(data || []);
      } catch (err) {
        console.error('Database query error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAutomatedPapers();
  }, [selectedExam, selectedTerm]);

  // Triggered when a user selects a paper row
  const handlePaperClick = (paper) => {
    if (paper.is_premium) {
      setCheckoutPaper(paper); // Opens the M-PESA STK menu drawer
    } else {
      // Instant open link for free documents
      alert(`Opening Free Document: ${paper.subject}`);
      window.open(`${supabaseUrl}/storage/v1/object/public/${paper.storage_path}`, '_blank');
    }
  };

  // Triggers your secure M-PESA API Route
  const handleStkPushSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus('sending');

    // Quick formatting to ensure phone number starts with 254
    let formattedPhone = phoneNumber.trim().replace(/\+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }

    if (!formattedPhone.startsWith('254') || formattedPhone.length !== 12) {
      alert('Please enter a valid Safaricom phone number (e.g., 0712345678 or 254712345678)');
      setPaymentStatus('');
      return;
    }

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: checkoutPaper.price,
          examId: checkoutPaper.id,
          subject: checkoutPaper.subject
        }),
      });

      const result = await response.json();

      if (response.ok && result.ResponseCode === '0') {
        setPaymentStatus('prompted');
      } else {
        alert(`M-PESA Error: ${result.errorMessage || 'Failed to trigger STK Push'}`);
        setPaymentStatus('');
      }
    } catch (error) {
      console.error('STK Push submission error:', error);
      alert('Payment server unreachable. Let us set up the API endpoint next!');
      setPaymentStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased">
      <header className="bg-[#002D62] text-white py-8 px-4 border-b-4 border-[#D4AF37] text-center relative shadow-md">
        <button onClick={() => router.push('/')} className="absolute left-4 top-8 text-xs font-bold text-[#D4AF37] hover:underline uppercase tracking-wider">
          ← Home
        </button>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#D4AF37]">Prediction Hub</h1>
        <p className="text-xs text-gray-300 mt-1 uppercase tracking-widest font-semibold">National Evaluation Matrices</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* EXAM TIER ROW */}
        <div className="text-center mb-6">
          <div className="inline-flex rounded-lg bg-gray-200 p-1 shadow-inner">
            {examTypes.map((exam) => (
              <button key={exam} onClick={() => setSelectedExam(exam)} className={`px-6 py-2.5 rounded-md text-xs font-black tracking-wider uppercase transition-all ${selectedExam === exam ? 'bg-[#002D62] text-white shadow-md' : 'text-gray-600'}`}>
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* TERM ROW */}
        <div className="text-center mb-10">
          <div className="flex justify-center gap-3">
            {terms.map((term) => (
              <button key={term} onClick={() => setSelectedTerm(term)} className={`px-4 py-2 border-2 rounded-md text-xs font-bold tracking-wide transition-all ${selectedTerm === term ? 'border-[#D4AF37] bg-white text-[#002D62] font-black shadow-sm' : 'border-gray-200 bg-white text-gray-500'}`}>
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC M-PESA POPUP DIALOG */}
        {checkoutPaper && (
          <div className="mb-8 border-2 border-[#D4AF37] bg-white rounded-2xl p-6 shadow-md animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-black text-[#002D62] text-xs uppercase tracking-widest">Secure M-PESA Checkout</h3>
                <p className="text-sm font-extrabold text-gray-900 mt-1 uppercase">
                  {checkoutPaper.grade_class} {checkoutPaper.subject} ({checkoutPaper.term})
                </p>
              </div>
              <button onClick={() => setCheckoutPaper(null)} className="text-gray-400 hover:text-gray-600 font-bold text-sm">✕ Close</button>
            </div>

            <form onSubmit={handleStkPushSubmit} className="flex flex-col sm:flex-row items-end gap-3 border-t pt-4">
              <div className="w-full">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">Enter Safaricom Number</label>
                <input 
                  type="text" 
                  placeholder="e.g., 0712345678" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={paymentStatus === 'sending' || paymentStatus === 'prompted'}
                  className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-md text-sm font-bold focus:border-[#002D62] outline-none"
                  required 
                />
              </div>
              <button 
                type="submit"
                disabled={paymentStatus === 'sending' || paymentStatus === 'prompted'}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-md transition-all shadow whitespace-nowrap disabled:bg-gray-300"
              >
                {paymentStatus === 'sending' && 'Sending STK Push... 🔄'}
                {paymentStatus === 'prompted' && 'Check Phone Pin Prompt! 📱'}
                {!paymentStatus && `Pay KES ${checkoutPaper.price} via M-PESA 💳`}
              </button>
            </form>
          </div>
        )}

        {/* EXAM CARDS GRID CONTAINER */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-[#002D62] text-sm uppercase tracking-wider border-b pb-4 mb-4">
            Available {selectedExam} Booklets ({selectedTerm})
          </h3>

          {loading ? (
            <p className="text-center text-xs text-gray-400 py-6 font-bold uppercase tracking-widest">Querying Storage Core...</p>
          ) : papers.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No assessment papers live for this filter combination yet.</p>
          ) : (
            <div className="space-y-3">
              {papers.map((paper) => (
                <div 
                  key={paper.id} 
                  onClick={() => handlePaperClick(paper)}
                  className={`group border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                    paper.is_premium ? 'border-amber-200 bg-amber-50/20 hover:bg-amber-50/40' : 'border-gray-100 hover:border-[#002D62] hover:bg-blue-50/30'
                  }`}
                >
                  <div>
                    <h4 className="font-extrabold text-[#002D62] text-xs sm:text-sm uppercase tracking-tight">{paper.subject}</h4>
                    <p className="text-gray-400 text-[11px] mt-0.5">Complete Booklet + Verified Marking Guide</p>
                  </div>
                  <div>
                    {paper.is_premium ? (
                      <span className="text-[10px] font-black tracking-wider text-white bg-[#D4AF37] px-3 py-1.5 rounded uppercase shadow-sm">
                        KES {paper.price} 🎯
                      </span>
                    ) : (
                      <span className="text-[10px] font-black tracking-wider text-white bg-green-600 px-3 py-1.5 rounded uppercase shadow-sm">
                        FREE 📂
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
