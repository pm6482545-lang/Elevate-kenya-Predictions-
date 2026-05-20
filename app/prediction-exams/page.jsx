'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PredictionExamsPage() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState('KJSEA'); 
  const [selectedTerm, setSelectedTerm] = useState('Term 2'); 
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemError, setSystemError] = useState(null); 
  const [debugRawFiles, setDebugRawFiles] = useState([]); 
  
  const [checkoutPaper, setCheckoutPaper] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const examTypes = ['KPSEA', 'KJSEA', 'KCSE'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  useEffect(() => {
    const autoFetchFromBucket = async () => {
      setLoading(true);
      setCheckoutPaper(null);
      setPaymentStatus('');
      setSystemError(null);
      setDebugRawFiles([]);
      
      try {
        if (!supabaseUrl || !supabaseAnonKey) {
          setSystemError("Vercel Environment Keys Missing! The frontend cannot see your Supabase URL or Anon Key.");
          setLoading(false);
          return;
        }

        const { data: fileList, error } = await supabase
          .storage
          .from('premium resources')
          .list('', { limit: 100 });

        if (error) {
          setSystemError(`Supabase Storage Error: ${error.message}`);
          throw error;
        }

        if (fileList && Array.isArray(fileList)) {
          setDebugRawFiles(fileList); 

          const decodedPapers = fileList
            .filter(file => file && file.name && file.name.endsWith('.pdf'))
            .map((file) => {
              try {
                const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.pdf')) || file.name;
                const parts = nameWithoutExt.split('-');

                if (parts.length < 4) return null;

                const rawTier = parts[0] || '';
                const rawGrade = parts[1] || '';
                const rawTerm = parts[2] || '';
                const rawSubject = parts[3] || '';
                const priceVal = parts[4] || '0';

                const cleanTerm = rawTerm.split('_').join(' ');
                const cleanSubject = rawSubject.split('_').join(' ');
                const formattedTerm = cleanTerm.replace(/\b\w/g, c => c.toUpperCase());

                return {
                  id: file.id || file.name,
                  school_tier: rawTier.trim().toLowerCase(),      
                  grade_class: rawGrade.trim().toLowerCase(),     
                  term_match: cleanTerm.trim().toLowerCase(),    
                  display_term: formattedTerm.trim(),            
                  subject: cleanSubject.trim(),
                  price: parseInt(priceVal, 10) || 0,
                  storage_path: file.name
                };
              } catch (innerErr) {
                return null;
              }
            })
            .filter(item => item !== null);

          const liveFiltered = decodedPapers.filter(
            (p) => p.school_tier === 'prediction_exams' && 
                   p.grade_class === selectedExam.toLowerCase() && 
                   p.term_match === selectedTerm.toLowerCase()
          );

          setPapers(liveFiltered);
        }
      } catch (err) {
        console.error(err);
        if (!systemError) setSystemError(err.message);
      } finally {
        setLoading(false);
      }
    };

    autoFetchFromBucket();
  }, [selectedExam, selectedTerm]);

  const handlePaperClick = (paper) => {
    setCheckoutPaper(paper);
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
      alert('Payment initialization failed.');
      setPaymentStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased">
      {/* ADAPTIVE MOBILE-FRIENDLY HEADER */}
      <header className="bg-[#002D62] text-white py-6 sm:py-8 px-4 border-b-4 border-[#D4AF37] text-center shadow-md flex flex-col items-center justify-center gap-2 relative">
        <button 
          onClick={() => router.push('/')} 
          className="sm:absolute sm:left-4 sm:top-8 mb-2 sm:mb-0 text-xs font-black text-[#D4AF37] hover:underline uppercase tracking-wider border border-[#D4AF37]/30 px-3 py-1 sm:border-0 rounded"
        >
          ← Home
        </button>
        <div>
          <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-[#D4AF37]">Prediction Hub</h1>
          <p className="text-[10px] sm:text-xs text-gray-300 mt-1 uppercase tracking-widest font-semibold">National Evaluation Matrices</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* SYSTEM STATUS DIAGNOSTIC PANEL */}
        {systemError && (
          <div className="mb-4 bg-red-50 border-2 border-red-500 rounded-xl p-4 text-red-900 text-xs font-mono overflow-x-auto">
            <p className="font-bold uppercase tracking-wider mb-1 text-red-700">⚠️ System Diagnostic Notice:</p>
            <p className="whitespace-nowrap">{systemError}</p>
          </div>
        )}

        <div className="mb-6 bg-gray-100 border rounded-xl p-3 text-[10px] sm:text-[11px] font-mono flex flex-wrap gap-2 sm:gap-4 justify-center text-gray-600 overflow-x-auto whitespace-nowrap">
          <span>Project Link: {supabaseUrl ? "✅ OK" : "❌ Missing"}</span>
          <span>Files in Bucket: <strong className="text-gray-900">{debugRawFiles.length}</strong></span>
        </div>

        {/* RESPONSIVE EXAM TIER ROW */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="grid grid-cols-3 sm:inline-flex rounded-lg bg-gray-200 p-1 shadow-inner w-full sm:w-auto gap-1 sm:gap-0">
            {examTypes.map((exam) => (
              <button 
                key={exam} 
                onClick={() => setSelectedExam(exam)} 
                className={`px-2 sm:px-6 py-2.5 rounded-md text-xs font-black tracking-wider uppercase transition-all text-center ${selectedExam === exam ? 'bg-[#002D62] text-white shadow-md' : 'text-gray-600'}`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* RESPONSIVE TERM ROW */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center gap-2 sm:gap-3 w-full">
            {terms.map((term) => (
              <button 
                key={term} 
                onClick={() => setSelectedTerm(term)} 
                className={`flex-1 sm:flex-none px-2 sm:px-4 py-2.5 border-2 rounded-md text-[11px] sm:text-xs font-bold tracking-wide transition-all text-center bg-white ${selectedTerm === term ? 'border-[#D4AF37] text-[#002D62] font-black shadow-sm' : 'border-gray-200 text-gray-500'}`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC M-PESA POPUP DIALOG */}
        {checkoutPaper && (
          <div className="mb-6 border-2 border-[#D4AF37] bg-white rounded-2xl p-4 sm:p-6 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-black text-[#002D62] text-[10px] uppercase tracking-widest">Secure M-PESA Checkout</h3>
                <p className="text-sm font-extrabold text-gray-900 mt-1 uppercase">
                  {selectedExam} {checkoutPaper.subject} ({checkoutPaper.display_term})
                </p>
              </div>
              <button onClick={() => setCheckoutPaper(null)} className="text-gray-400 hover:text-gray-600 font-bold text-sm p-1">✕</button>
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
                  className="w-full border-2 border-gray-200 px-3 py-2.5 rounded-md text-sm font-bold focus:border-[#002D62] outline-none"
                  required 
                />
              </div>
              <button 
                type="submit"
                disabled={paymentStatus === 'sending' || paymentStatus === 'prompted'}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider px-4 py-3.5 rounded-md transition-all shadow whitespace-nowrap disabled:bg-gray-300"
              >
                {paymentStatus === 'sending' && 'Sending STK Push... 🔄'}
                {paymentStatus === 'prompted' && 'Check Phone Pin Prompt! 📱'}
                {!paymentStatus && `Pay KES ${checkoutPaper.price} via M-PESA 💳`}
              </button>
            </form>
          </div>
        )}

        {/* EXAM CARDS CONTAINER */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <h3 className="font-black text-[#002D62] text-xs sm:text-sm uppercase tracking-wider border-b pb-3 mb-4">
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
                  className="group border border-amber-200 bg-amber-50/20 hover:bg-amber-50/40 rounded-xl p-3 sm:p-4 flex items-center justify-between cursor-pointer transition-all gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-[#002D62] text-xs sm:text-sm uppercase tracking-tight truncate">{paper.subject}</h4>
                    <p className="text-gray-400 text-[10px] sm:text-[11px] mt-0.5 truncate">Complete Booklet + Marking Guide</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-white bg-[#D4AF37] px-2.5 sm:px-3 py-1.5 rounded uppercase shadow-sm whitespace-nowrap">
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
