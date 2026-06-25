import React from 'react';
import { LogOut, Settings, FolderOpen, Home, Lock } from 'lucide-react';

export default function Header({ theme, adminCreds, isLoggedIn, activeTab, onTabChange, onSettings, onLogout, onLogin, onHome }) {
  return (
    <header className={`${theme.header} backdrop-blur-md border-b ${theme.border} px-6 py-4 flex items-center justify-between sticky top-0 z-40`}>
      <div className="flex items-center space-x-3">
        <span className="w-2 h-2 rounded-full animate-pulse opacity-75"></span>
        <div>
          <h1 className="font-serif text-lg tracking-wider uppercase font-semibold">{adminCreds.title}</h1>
          <p className="text-[10px] uppercase font-mono tracking-widest opacity-50">{adminCreds.subtitle || theme.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 text-xs">
        <button 
          onClick={() => onTabChange('gallery')}
          className={`px-3 py-1.5 rounded font-mono tracking-widest uppercase transition-all ${activeTab === 'gallery' ? theme.primary : `opacity-60 hover:opacity-100`}`}
        >
          Gallery
        </button>
        
        {isLoggedIn ? (
          <>
            <button 
              onClick={() => onTabChange('portal')}
              className={`px-3 py-1.5 rounded font-mono tracking-widest uppercase flex items-center space-x-1.5 transition-all ${activeTab === 'portal' ? theme.primary : `opacity-60 hover:opacity-100`}`}
            >
              <FolderOpen size={12} />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => onTabChange('metrics')}
              className={`px-3 py-1.5 rounded font-mono tracking-widest uppercase transition-all ${activeTab === 'metrics' ? theme.primary : `opacity-60 hover:opacity-100`}`}
            >
              📊 Metrics
            </button>
            <button 
              onClick={onSettings}
              className="p-1.5 opacity-60 hover:opacity-100 transition-colors"
              title="Settings"
            >
              <Settings size={16} />
            </button>
            <button 
              onClick={onHome}
              className="p-1.5 opacity-60 hover:opacity-100 transition-colors"
              title="Home"
            >
              <Home size={16} />
            </button>
            <button 
              onClick={onLogout}
              className="p-1.5 opacity-60 hover:opacity-100 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <button 
            onClick={onLogin}
            className={`px-3 py-1.5 border ${theme.border} rounded font-mono tracking-widest uppercase flex items-center space-x-1 hover:opacity-75 transition-all`}
          >
            <Lock size={12} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
