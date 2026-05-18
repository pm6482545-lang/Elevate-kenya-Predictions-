import { useState, useEffect } from 'react';
import { getPredictionPapers, getTermlyExams } from '../utils/dbQueries';
import MpesaModal from '../components/MpesaModal';

export default function Home() {
  // State for active filters
  const [activeTab, setActiveTab] = useState('kjsea'); // 'kjsea' (Grade 9), 'kpsea' (Grade 6), 'kcse' (Form 4)
  const [selectedTerm, setSelectedTerm] = useState(2); // Default to Term 2
  
  // State for data and UI
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch papers dynamically whenever the active tab or selected term changes
  useEffect(() => {
    async function fetchStorefrontData() {
      setLoading(true);
      try {
        let data = [];
        // Maps the tab selections cleanly to your dbQueries logic
        if (activeTab === 'kjsea') {
          data = await getPredictionPapers('kjsea');
        } else if (activeTab === 'kpsea') {
          data = await getPredictionPapers('kpsea');
        } else if (activeTab === 'kcse') {
          data = await getPredictionPapers('kcse');
        }
        
        // Filter the fetched results by the selected term manually to keep UX fast
        const filteredData = data.filter(paper => (paper.term || 2) === Number(selectedTerm));
        setPapers(filteredData);
      } catch (err) {
        console.error('Error rendering homepage components:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStorefrontData();
  }, [activeTab, selectedTerm]);

  const handleUnlockClick = (paper) => {
    setSelectedPaper(paper);
    setIsModalOpen(true);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f4f6f4', minHeight: '100vh', color: '#222', paddingBottom: '60px' }}>
      
      {/* SECTION A: Navigation & Brand Identity */}
      <header style={{ backgroundColor: '#004d00', color: '#fff', padding: '30px 20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '0.5px' }}>ELEVATE KENYA PREDICTIONS</h1>
        <p style={{ margin: '6px 0 0 0', opacity: 0.9, fontSize: '14px', fontWeight: '400' }}>
          National Assessment Specialists • Reliable Science & Mathematics Materials
        </p>
        <div style={{ display: 'inline-block', marginTop: '12px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
          📞 Support Support: 254746357349
        </div>
      </header>

      <main style={{ maxWidth: '750px', margin: '0 auto', padding: '20px 15px' }}>
        
        {/* HOW IT WORKS TRUST BANNER */}
        <section style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', marginBottom: '25px', borderLeft: '5px solid #006400', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#006400', fontWeight: '700' }}>Instant Delivery Process:</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
            Click <strong>Unlock Paper</strong> → Enter your M-Pesa phone number → Complete PIN Prompt on your phone → Download your premium PDF layout instantly.
          </p>
        </section>

        {/* SECTION B: Dynamic Level Filtering Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#ddd', borderRadius: '8px', padding: '4px', marginBottom: '15px' }}>
          <button 
            onClick={() => setActiveTab('kjsea')}
            style={{ flex: 1, padding: '12px 8px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'kjsea' ? '#fff' : 'transparent', color: activeTab === 'kjsea' ? '#004d00' : '#555' }}
          >
            KJSEA (Grade 9)
          </button>
          <button 
            onClick={() => setActiveTab('kpsea')}
            style={{ flex: 1, padding: '12px 8px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'kpsea' ? '#fff' : 'transparent', color: activeTab === 'kpsea' ? '#004d00' : '#555' }}
          >
            KPSEA (Grade 6)
          </button>
          <button 
            onClick={() => setActiveTab('kcse')}
            style={{ flex: 1, padding: '12px 8px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', backgroundColor: activeTab === 'kcse' ? '#fff' : 'transparent', color: activeTab === 'kcse' ? '#004d00' : '#555' }}
          >
            KCSE (Form 4)
          </button>
        </div>

        {/* Term Select Sub-Filter */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center' }}>
          {[1, 2, 3].map((term) => (
            <button
              key={term}
              onClick={() => setSelectedTerm(term)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: selectedTerm === term ? '#006400' : '#ccc',
                backgroundColor: selectedTerm === term ? '#e8f5e9' : '#fff',
                color: selectedTerm === term ? '#006400' : '#666',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Term {term}
            </button>
          ))}
        </div>

        {/* SECTION C: The Resource Showcase Grid */}
        <section>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
              <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #ccc', borderTopColor: '#006400', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '10px' }}></div>
              <p style={{ margin: 0, fontSize: '14px' }}>Loading specific assessment tracks...</p>
            </div>
          ) : papers.length === 0 ? (
            <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '40px 20px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
              <p style={{ margin: 0, color: '#777', fontSize: '14px' }}>
                No exam matching Term {selectedTerm} listed inside this category yet.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {papers.map((paper) => (
                <div 
                  key={paper.id} 
                  style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', color: '#1a1a1a', fontWeight: '700', lineHeight: '1.4', flex: 1, paddingRight: '10px' }}>
                        {paper.title}
                      </h4>
                      <span style={{ backgroundColor: paper.is_premium ? '#fff3cd' : '#e8f5e9', color: paper.is_premium ? '#856404' : '#155724', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        {paper.is_premium ? 'PREMIUM' : 'FREE'}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                        {paper.subjects?.name || 'General Science'}
                      </span>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                        {activeTab.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '4px' }}>
                    <div>
                      <span style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '1px' }}>Price per Copy</span>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#006400' }}>
                        KSH {paper.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleUnlockClick(paper)}
                      style={{ backgroundColor: '#006400', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '#fff', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,77,0,0.2)', transition: '0.2s' }}
                    >
                      Unlock Paper
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* SECTION E: Footer Compliance */}
      <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px', fontSize: '12px', color: '#777', borderTop: '1px solid #e0e0e0' }}>
        <p style={{ margin: '0 0 6px 0' }}>&copy; {new Date().getFullYear()} Elevate Kenya Predictions. All Rights Reserved.</p>
        <p style={{ margin: 0 }}>Automated Digital Procurement Engine synced via Safaricom Daraja Enterprise Architecture.</p>
      </footer>

      {/* SECTION D: Embedded Payment Overlay Container */}
      {selectedPaper && (
        <MpesaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          resourceId={selectedPaper.id}
          amount={selectedPaper.price}
          resourceTitle={selectedPaper.title}
        />
      )}

      {/* CSS Injection for custom component animations */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
