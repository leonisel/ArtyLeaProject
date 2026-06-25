import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LoginModal({ theme, onLogin, onClose, adminCreds, showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    onLogin(username, password);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    if (!forgotEmail) {
      setError('Enter your email.');
      return;
    }
    if (forgotEmail !== adminCreds.email) {
      setError('Email not found.');
      return;
    }
    showToast('Recovery link sent (simulated).', 'info');
    setForgotMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className={`border ${theme.border} p-8 rounded max-w-md w-full mx-4 bg-opacity-95`} style={{ backgroundColor: theme.bg }}>
        
        {forgotMode ? (
          <>
            <h3 className="font-serif text-xl mb-4 font-medium">Password Recovery</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input 
                type="email" 
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="your@email.com" 
                className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button 
                type="submit"
                className={`w-full ${theme.primary} py-2.5 rounded text-xs font-mono tracking-widest uppercase`}
              >
                Send Link
              </button>
              <button 
                type="button"
                onClick={() => setForgotMode(false)}
                className="w-full text-xs opacity-60 hover:opacity-100"
              >
                Back
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="font-serif text-xl mb-6 font-medium">Admin Portal</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin" 
                className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
              />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password" 
                className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button 
                type="submit"
                className={`w-full ${theme.primary} py-3 rounded text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2`}
              >
                <span>Login</span>
                <ArrowRight size={12} />
              </button>
            </form>
            <button 
              onClick={() => setForgotMode(true)}
              className="w-full mt-4 text-xs opacity-60 hover:opacity-100 underline"
            >
              Forgot Password?
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-4 text-xs opacity-60 hover:opacity-100"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
