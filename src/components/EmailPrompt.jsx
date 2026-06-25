import React, { useState, useEffect } from 'react';
import { Mail, Settings } from 'lucide-react';

export default function EmailPrompt({ theme, adminCreds, onUpdateCreds, onClose, showToast }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required.');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email address.');
      return;
    }

    const updated = { ...adminCreds, email };
    onUpdateCreds(updated);
    showToast('Recovery email saved successfully.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded max-w-md w-full mx-4 bg-white text-black">
        <div className="flex items-center space-x-2 mb-4">
          <Mail size={20} className="text-blue-600" />
          <h3 className="font-serif text-xl font-medium">Add Recovery Email</h3>
        </div>
        
        <p className="text-sm mb-6 text-gray-700">
          Set up a recovery email address to regain access if you forget your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com" 
            className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
            autoFocus
          />
          
          {error && <p className="text-xs text-red-600">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded text-xs font-mono tracking-widest uppercase hover:bg-blue-700"
          >
            Save Recovery Email
          </button>

          <button 
            type="button"
            onClick={onClose}
            className="w-full border border-gray-400 py-2.5 rounded text-xs font-mono tracking-widest uppercase text-black hover:bg-gray-100"
          >
            Skip for Now
          </button>
        </form>
      </div>
    </div>
  );
}
