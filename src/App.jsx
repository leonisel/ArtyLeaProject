import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  FolderOpen, 
  Plus, 
  LogOut, 
  Save, 
  Trash2, 
  Eye,
  ThumbsUp,
  MessageSquare,
  Settings,
  Download,
  Upload,
  Home
} from 'lucide-react';

import Header from './components/Header';
import LoginModal from './components/LoginModal';
import SettingsModal from './components/SettingsModal';
import CustomizationPanel from './components/CustomizationPanel';
import EmailPrompt from './components/EmailPrompt';
import GalleryView from './components/GalleryView';
import DashboardEditor from './components/DashboardEditor';
import MetricsView from './components/MetricsView';
import HomePage from './components/HomePage';
import Toast from './components/Toast';

const initialCaseFiles = [
  {
    id: '1',
    fileNo: '01200',
    title: 'Anomalous Artifact Alpha',
    artistName: 'Unknown Subject-9',
    officer: 'Agent Lea',
    startDate: '2026-06-20',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
    research: 'Initial physical findings suggest a strong correlation between the jagged obsidian edges of the subject and early 20th-century brutalist manifestations.\n\nThe object appears perfectly isolated within standard visual frames, drawing the human eye towards its geometric imperfections. Spectrometry readings continue to fluctuate. What is art in the context of temporal displacement? We believe the shape attempts to spell an unrecognized dimensional anchor.',
    notes: '[CLASSIFIED LEVEL-4] Awaiting secondary analysis from Site B. Do not handle without protective resonance dampeners. Subject exhibits mild magnetic distortion within a 1.2-meter radius.',
    citations: '[1] Smith, J. (2025). "Anomalies in Modern Form." Journal of Obscure Artifacts, 12(4), 112-115.\n[2] RB-Gallery Internal File #IMG20260624103047.jpg'
  },
  {
    id: '2',
    fileNo: '11010',
    title: 'The Fragmented Memory',
    artistName: 'Subject 84-B',
    officer: 'Director Vance',
    startDate: '2026-06-22',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
    research: 'Recovered from the lower vaults of Arty Lea\'s Research Beero. The canvas exhibits microscopic fissures that align into a coherent structural grid when viewed under UV light.\n\nThe narrative is beautiful yet fragmented, indicating a localized temporal loop. The subject captures a fleeting moment of a structure right before dynamic collapse.',
    notes: '[CLASSIFIED LEVEL-3] Requires constant light stabilization before public exhibition. Under no circumstances should UV lamps remain active near the original canvas for more than 45 seconds.',
    citations: '[1] Bureau Memo #4492 - "Recovery protocols for fragile anomalous mediums."'
  }
];

const THEMES = {
  obsvr: {
    name: 'OBSVR (Initial)',
    bg: '#FDFCF7',
    header: 'bg-[#FDFCF7]/95',
    text: 'text-stone-950',
    primary: 'bg-stone-950 text-[#FDFCF7]',
    accent: 'text-emerald-400',
    border: 'border-stone-200',
    subtitle: 'Arty Lea\'s Research Beero // RB Gallery'
  },
  uk: {
    name: 'UK Official',
    bg: '#F5F5F5',
    header: 'bg-blue-900/95',
    text: 'text-blue-900',
    primary: 'bg-blue-600 text-white',
    accent: 'text-red-600',
    border: 'border-blue-300',
    subtitle: 'Her Majesty\'s Archive Division // Official Records'
  },
  secret: {
    name: 'Secret Organization',
    bg: '#1a1a1a',
    header: 'bg-gray-900/95',
    text: 'text-gray-100',
    primary: 'bg-red-700 text-white',
    accent: 'text-yellow-400',
    border: 'border-red-900',
    subtitle: 'CLASSIFIED // TOP SECRET CLEARANCE REQUIRED'
  }
};

export default function App() {
  const [sessionAuth, setSessionAuth] = useState(() => {
    const saved = sessionStorage.getItem('obsvr_session_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const [caseFiles, setCaseFiles] = useState(() => {
    const saved = localStorage.getItem('obsvr_case_files');
    return saved ? JSON.parse(saved) : initialCaseFiles;
  });
  
  const [activeTab, setActiveTab] = useState('gallery');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  
  const [adminCreds, setAdminCreds] = useState(() => {
    const defaults = { username: 'admin', password: 'admin', email: '', title: 'OBSVR', theme: 'obsvr' };
    localStorage.setItem('obsvr_admin_creds', JSON.stringify(defaults));
    return defaults;
  });

  const [toastMessage, setToastMessage] = useState(null);

  let theme = THEMES[adminCreds.theme] || THEMES.obsvr;
  
  if (adminCreds.bgColor || adminCreds.primaryColor) {
    theme = {
      ...theme,
      bg: adminCreds.bgColor || theme.bg,
      primary: `bg-[${adminCreds.primaryColor}] text-white` || theme.primary
    };
  }

  useEffect(() => {
    if (sessionAuth) {
      sessionStorage.setItem('obsvr_session_auth', JSON.stringify(sessionAuth));
    } else {
      sessionStorage.removeItem('obsvr_session_auth');
    }
  }, [sessionAuth]);

  useEffect(() => {
    localStorage.setItem('obsvr_case_files', JSON.stringify(caseFiles));
  }, [caseFiles]);

  useEffect(() => {
    localStorage.setItem('obsvr_admin_creds', JSON.stringify(adminCreds));
  }, [adminCreds]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (username, password) => {
    if (username === adminCreds.username && password === adminCreds.password) {
      setSessionAuth({ username, loginTime: new Date().toISOString() });
      setShowLoginModal(false);
      setActiveTab('gallery');
      if (!adminCreds.email) {
        setShowEmailPrompt(true);
      }
      showToast("Access Granted. Secure channel active.", "success");
    } else {
      showToast("Authentication invalid.", "error");
    }
  };

  const handleLogout = () => {
    setSessionAuth(null);
    setActiveTab('gallery');
    showToast("Logged out successfully.", "info");
  };

  const exportCaseFiles = () => {
    const dataStr = JSON.stringify(caseFiles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `obsvr_case_files_${Date.now()}.json`;
    link.click();
    showToast("Case files exported.", "success");
  };

  const importCaseFiles = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setCaseFiles(imported);
          showToast("Case files imported successfully.", "success");
        } catch (err) {
          showToast("Invalid file format.", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (showHomePage) {
    return <HomePage theme={theme} onEnter={() => setShowHomePage(false)} />;
  }

  return (
    <div style={{ backgroundColor: theme.bg }} className={`min-h-screen ${theme.text} font-sans flex flex-col relative pb-12`}>
      
      <Toast message={toastMessage} />

      <Header 
        theme={theme} 
        adminCreds={adminCreds}
        isLoggedIn={!!sessionAuth}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettings={() => setShowSettingsModal(true)}
        onLogout={handleLogout}
        onLogin={() => setShowLoginModal(true)}
        onHome={() => setShowHomePage(true)}
      />

      <main className="flex-grow">
        
        {activeTab === 'gallery' && (
          <GalleryView theme={theme} caseFiles={caseFiles} />
        )}

        {activeTab === 'portal' && sessionAuth && (
          <DashboardEditor 
            theme={theme}
            caseFiles={caseFiles}
            setCaseFiles={setCaseFiles}
            showToast={showToast}
            onExport={exportCaseFiles}
            onImport={importCaseFiles}
          />
        )}

        {activeTab === 'metrics' && sessionAuth && (
          <MetricsView theme={theme} />
        )}

        {!sessionAuth && activeTab === 'portal' && (
          <div className="max-w-md mx-auto my-24 px-6 text-center">
            <p className="opacity-75 mb-4">Login required to access dashboard.</p>
            <button 
              onClick={() => setShowLoginModal(true)}
              className={`${theme.primary} px-6 py-2 rounded text-xs font-mono tracking-widest uppercase`}
            >
              Login
            </button>
          </div>
        )}

      </main>

      {showLoginModal && (
        <LoginModal 
          theme={theme}
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
          adminCreds={adminCreds}
          onUpdateCreds={setAdminCreds}
          showToast={showToast}
        />
      )}

      {showSettingsModal && sessionAuth && (
        <SettingsModal 
          theme={theme}
          adminCreds={adminCreds}
          onUpdateCreds={setAdminCreds}
          onClose={() => setShowSettingsModal(false)}
          showToast={showToast}
          onOpenCustomization={() => {
            setShowSettingsModal(false);
            setShowCustomizationPanel(true);
          }}
        />
      )}

      {showCustomizationPanel && sessionAuth && (
        <CustomizationPanel 
          theme={theme}
          adminCreds={adminCreds}
          onUpdateCreds={setAdminCreds}
          onClose={() => setShowCustomizationPanel(false)}
          showToast={showToast}
        />
      )}

      {showEmailPrompt && sessionAuth && (
        <EmailPrompt 
          theme={theme}
          adminCreds={adminCreds}
          onUpdateCreds={setAdminCreds}
          onClose={() => setShowEmailPrompt(false)}
          showToast={showToast}
        />
      )}

    </div>
  );
}
