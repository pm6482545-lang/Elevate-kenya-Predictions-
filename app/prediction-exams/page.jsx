'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Connection to your Supabase project architecture
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PredictionExamsPage() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState('KJSEA'); 
  const [selectedTerm, setSelectedTerm] = useState('Term 2'); 
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // STK Push state trackers
  const [checkoutPaper, setCheckoutPaper] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const examTypes = ['KPSEA', 'KJSEA', 'KCSE'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  // Automatically read and decode bucket files on filter click
  useEffect(() => {
    const autoFetchFromBucket = async () => {
      setLoading(true);
      setCheckoutPaper(null);
      setPaymentStatus('');
      try {
        // 1. List all files directly from your 'premium resources' storage bucket
        const { data: fileList, error } = await supabase
          .storage
          .from('premium resources')
          .list('', { limit: 100 });

        if (error) throw error;

        if (fileList) {
          // 2. Map through the bucket files and decode their names automatically
          const decodedPapers = fileList
            .filter(file => file.name.endsWith('.pdf')) // Only process PDF files
            .map((file) => {
              // Remove the .pdf extension and split the name by hyphens
              const nameWithoutExt = file.name.replace('.pdf', '');
              const parts = nameWithoutExt.split('-');

              // Default fallbacks if a file doesn't follow the exact naming scheme
              const tier = parts[0] || 'unknown';
              const grade = parts[1] || 'KJSEA';
              const term = parts[2] || 'Term 2';
              const rawSubject = parts[3] || 'Assessment Paper';
              const priceVal = parts[4] || '100';

              // Clean up presentation formatting (replace underscores with spaces)
              const cleanSubject = rawSubject.replace(/_/g, ' ');

              return {
                id: file.id || file.name,
                school_tier: tier.replace(/_/g, ' '), // e.g., "prediction exams"
                grade_class: grade.toUpperCase(),     // e.g., "KJSEA"
                term: term.charAt(0).toUpperCase() + term.slice(1), // e.g., "Term 2"
                subject: cleanSubject,
                price: parseInt(priceVal, 10) || 0,
                is_premium: parseInt(priceVal, 10) > 0,
                storage_path: file.name // Safe reference for delivery
              };
            });

          // 3. Filter the decoded files so only the items matching the open tabs show up
          const liveFiltered = decodedPapers.filter(
            (p) => p.school_tier === 'prediction exams' && 
                   p.grade_class === selectedExam && 
                   p.term === selectedTerm
          );

          setPapers(liveFiltered);
        }
      } catch (err) {
        console.error('Storage bucket reading error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    autoFetchFromBucket();
  }, [selectedExam, selectedTerm]);

  const handlePaperClick = (paper) => {
    setCheckoutPaper(paper); // Opens the M-PESA checkout drawer
  };

  const handleStkPushSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus('sending');

    let formattedPhone = phoneNumber.trim().replace(/\+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }

    if (!formattedPhone.startsWith('254') || formattedPhone.length !== 12) {
      alert('Please enter a valid Safaricom phone number (e.g., 0712345678)');
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
      alert('Payment execution failed. Waiting for live shortcode settings!');
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
          <div className="mb-8 border-2 border-[#D4AF37] bg-white rounded-2xl p-6 shadow-md">
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
            <p className="text-center text-xs text-gray-400 py-6 font-bold uppercase tracking-widest">Scanning Bucket Core...</p>
          ) : papers.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">No assessment papers live for this filter combination yet.</p>
          ) : (
            <div className="space-y-3">
              {papers.map((paper) => (
                <div 
                  key={paper.id} 
                  onClick={() => handlePaperClick(paper)}
                  className="group border border-amber-200 bg-amber-50/20 hover:bg-amber-50/40 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <h4 className="font-extrabold text-[#002D62] text-xs sm:text-sm uppercase tracking-tight">{paper.subject}</h4>
                    <p className="text-gray-400 text-[11px] mt-0.5">Complete Booklet + Verified Marking Guide</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-wider text-white bg-[#D4AF37] px-3 py-1.5 rounded uppercase shadow-sm">
                      KES {paper.price} 🎯
                    </span>
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
