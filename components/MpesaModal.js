import { useState } from 'react';

export default function MpesaModal({ isOpen, onClose, resourceId, amount, resourceTitle }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Sending M-Pesa STK Push prompt to your phone...');

    try {
      const response = await fetch('/api/mpesa-express', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, amount, resourceId }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage('PIN Prompt sent! Enter your M-Pesa PIN on your phone to complete purchase.');
        // In a complete build, you would add a small setInterval here to poll /api/orders to see when status changes to 'completed'
      } else {
        setStatusMessage(`Error: ${data.error || 'Failed to initiate checkout.'}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
        <h3 style={{ marginTop: 0, color: '#1a1a1a', fontSize: '20px' }}>Unlock Resource</h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}><strong>Item:</strong> {resourceTitle}</p>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '16px', marginTop: 0, marginBottom: '20px' }}>Amount: KSH {amount}</p>
        
        <form onSubmit={handlePayment}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>M-Pesa Phone Number</label>
          <input 
            type="tel" 
            placeholder="e.g., 0712345678" 
            required 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '16px', fontSize: '16px', boxSizing: 'border-box' }}
          />
          
          {statusMessage && (
            <p style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '6px', fontSize: '13px', color: '#444', borderLeft: '4px solid #006400', lineHeight: '1.4' }}>
              {statusMessage}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '500' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              style={{ flex: 2, padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#006400', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {loading ? 'Processing...' : 'Pay via M-Pesa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
