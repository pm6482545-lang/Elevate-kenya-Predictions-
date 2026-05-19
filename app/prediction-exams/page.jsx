'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PredictionExamsPage() {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState('KPSEA');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  const examTypes = ['KPSEA', 'KJSEA', 'KCSE'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];

  // Placeholder handler for the document click
  const handleExamClick = (subject) => {
    alert(`Initiating fetch for ${selectedExam} -> ${selectedTerm} -> ${subject}. Next we will connect this to Supabase!`);
  };

  // Completely mapped subject metrics matching your exact node counts
  const subjectsByExam = {
    KPSEA: ['Mathematics', 'Integrated Science', 'English', 'Kiswahili', 'Creative Arts & Social Studies'],
    KJSEA: [
      'Mathematics', 
      'Integrated Science', 
      'Pre-Technical Studies', 
      'Agriculture and Nutrition', 
      'Creative Arts and Sports', 
      'Christian Religious Education (CRE)', 
      'English', 
      'Kiswahili', 
      'Social Studies'
    ],
    KCSE: ['Mathematics Alt A', 'Biology', 'Chemistry', 'Physics', 'English', 'Kiswahili', 'History']
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-800 font-sans antialiased">
      {/* Mini Nav / Header banner */}
      <header className="bg-[#002D62] text-white py-8 px-4 border-b-4 border-[#D4AF37] text-center relative shadow-md">
        <button 
          onClick={() => router.push('/')} 
          className="absolute left-4 top-8 text-xs font-bold text-[#D4AF37] hover:underline uppercase tracking-wider"
        >
          ← Back Home
        </button>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#D4AF37]">
          National Prediction Hub
        </h1>
        <p className="text-xs text-gray-300 mt-1 uppercase tracking-widest font-semibold">
          Secure Academic Evaluation Matrices
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* EXAM CATEGORY SELECTOR */}
        <div className="text-center mb-8">
          <label className="block text-xs font-black text-[#002D62] uppercase tracking-widest mb-3">
            Select Assessment Tier
          </label>
          <div className="inline-flex rounded-lg bg-gray-200 p-1 shadow-inner">
            {examTypes.map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-6 py-2.5 rounded-md text-xs font-black tracking-wider uppercase transition-all ${
                  selectedExam === exam
                    ? 'bg-[#002D62] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#002D62]'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* TERM SELECTOR */}
        <div className="text-center mb-12">
          <label className="block text-xs font-black text-[#002D62] uppercase tracking-widest mb-3">
            Select Evaluation Interval
          </label>
          <div className="flex justify-center gap-3">
            {terms.map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-4 py-2 border-2 rounded-md text-xs font-bold tracking-wide transition-all ${
                  selectedTerm === term
                    ? 'border-[#D4AF37] bg-white text-[#002D62] font-black shadow-sm'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC PAPERS GRID */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex justify-between items-center border-b-2 border-gray-100 pb-4 mb-6">
            <h3 className="font-black text-[#002D62] text-sm uppercase tracking-wider">
              Available {selectedExam} Predictions ({selectedTerm})
            </h3>
            <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
              Premium Content
            </span>
          </div>

          <div className="space-y-3">
            {subjectsByExam[selectedExam].map((subject, index) => (
              <div 
                key={index}
                onClick={() => handleExamClick(subject)}
                className="group border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-[#002D62] hover:bg-blue-50/30 cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#002D62] flex items-center justify-center text-xs font-black group-hover:bg-[#002D62] group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#002D62] text-xs sm:text-sm uppercase tracking-tight group-hover:text-blue-700">
                      {subject}
                    </h4>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                      Complete Booklet with Verified Marking Schemes (LaTeX Sourced)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[10px] font-black tracking-wider text-white bg-[#D4AF37] px-3 py-1.5 rounded uppercase shadow-sm group-hover:bg-yellow-500 transition-colors">
                    Get Exam 🎯
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
