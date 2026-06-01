'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/Supabase'; // This imports the helper you just made!

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        // Register New Teacher
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Account created successfully! You can now sign in.' });
        setIsSignUp(false); // Switch to sign-in view automatically
      } else {
        // Sign In Existing Teacher
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        router.push('/'); // Redirect to your homepage upon success
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8">
        
        {/* BRANDING HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-black text-[#002D62] uppercase tracking-tight">Elevate Kenya Predictions</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
            {isSignUp ? 'Teacher Registration Portal' : 'Sign In To Your Account'}
          </p>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* NOTIFICATION MESSAGES */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-xs font-bold border ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* INTERACTIVE FORM */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="mwalimu@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 px-3 py-2.5 rounded-lg text-xs font-bold focus:border-[#002D62] outline-none bg-white"
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 px-3 py-2.5 rounded-lg text-xs font-bold focus:border-[#002D62] outline-none bg-white"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#002D62] hover:bg-[#001D42] text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-sm disabled:bg-gray-300"
          >
            {loading ? 'Processing... 🔄' : isSignUp ? 'Register Account' : 'Secure Sign In 🔐'}
          </button>
        </form>

        {/* TOGGLE LOGIC */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(null); }}
            className="text-xs font-extrabold text-[#D4AF37] hover:underline uppercase tracking-wide"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'New Teacher? Create an account'}
          </button>
        </div>

      </div>
    </div>
  );
}
