import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function SettingsModal({ theme, adminCreds, onUpdateCreds, onClose, showToast, onOpenCustomization }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(adminCreds.email);
  const [showEmailSetup, setShowEmailSetup] = useState(false);
  const [emailSetupError, setEmailSetupError] = useState('');
  const [error, setError] = useState('');

  const handleEmailSetup = (e) => {
    e.preventDefault();
    setEmailSetupError('');
    if (!email) {
      setEmailSetupError('Email is required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailSetupError('Invalid email address.');
      return;
    }
    const updated = { ...adminCreds, email };
    onUpdateCreds(updated);
    setShowEmailSetup(false);
    showToast('Email saved for recovery.', 'success');
  };

  const handleApplyChanges = (e) => {
    e.preventDefault();
    setError('');

    const updated = { ...adminCreds, email };

    if (newPassword) {
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      updated.password = newPassword;
      setNewPassword('');
      setConfirmPassword('');
    }

    onUpdateCreds(updated);
    onClose();
    showToast('Settings updated.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded max-w-md w-full mx-4 bg-white text-black max-h-[90vh] overflow-y-auto">
        
        {showEmailSetup ? (
          <>
            <h3 className="font-serif text-xl mb-4 font-medium text-black">Setup Recovery Email</h3>
            <p className="text-xs mb-6 text-gray-700">Add email to enable password recovery.</p>
            <form onSubmit={handleEmailSetup} className="space-y-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
              />
              {emailSetupError && <p className="text-xs text-red-600">{emailSetupError}</p>}
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded text-xs font-mono tracking-widest uppercase hover:bg-blue-700"
              >
                Save Email
              </button>
              <button 
                type="button"
                onClick={() => setShowEmailSetup(false)}
                className="w-full border border-gray-400 py-2.5 rounded text-xs font-mono tracking-widest uppercase hover:bg-gray-100"
              >
                Back
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="font-serif text-xl mb-6 font-medium text-black">Account Settings</h3>

            <form onSubmit={handleApplyChanges} className="space-y-4">

              {/* Recovery Email */}
              <div className="border-b border-gray-300 pb-4 mb-4">
                <label className="block text-xs font-mono mb-1.5 flex items-center space-x-1 text-black font-bold">
                  <Mail size={12} />
                  <span>Recovery Email</span>
                </label>
                <p className="text-xs mb-2 text-gray-700">{email || 'Not set'}</p>
                <button 
                  type="button"
                  onClick={() => setShowEmailSetup(true)}
                  className="text-xs underline text-blue-600 hover:text-blue-800"
                >
                  Change Email
                </button>
              </div>

              {/* Password */}
              <div className="border-b border-gray-300 pb-4 mb-4">
                <label className="block text-xs font-mono mb-1.5 text-black font-bold">New Password (optional)</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current" 
                  className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
                />

                {newPassword && (
                  <div className="mt-3">
                    <label className="block text-xs font-mono mb-1.5 text-black font-bold">Confirm Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
                    />
                  </div>
                )}
              </div>

              {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded text-xs font-mono tracking-widest uppercase hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>

            {/* Customization Button */}
            <button 
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomization();
              }}
              className="w-full mt-4 border border-blue-400 text-blue-600 py-2.5 rounded text-xs font-mono tracking-widest uppercase hover:bg-blue-50"
            >
              Customize Site
            </button>

            <button 
              type="button"
              onClick={onClose}
              className="w-full mt-2 border border-gray-400 py-2.5 rounded text-xs font-mono tracking-widest uppercase text-black hover:bg-gray-100"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
