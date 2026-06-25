import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  FolderOpen, 
  FileText, 
  Plus, 
  LogOut, 
  ArrowRight, 
  Save, 
  Trash2, 
  Camera,
  ShieldAlert,
  Eye,
  ThumbsUp,
  MessageSquare,
  Palette,
  Settings
} from 'lucide-react';

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
  const [page, setPage] = useState('home');
  const [caseFiles, setCaseFiles] = useState(() => {
    const saved = localStorage.getItem('obsvr_case_files');
    return saved ? JSON.parse(saved) : initialCaseFiles;
  });
  
  const [activeTab, setActiveTab] = useState('gallery');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [showEmailSetup, setShowEmailSetup] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSetupError, setEmailSetupError] = useState('');
  
  const [adminCreds, setAdminCreds] = useState(() => {
    const defaults = { username: 'admin', password: 'admin', email: '', title: 'OBSVR', theme: 'obsvr' };
    localStorage.setItem('obsvr_admin_creds', JSON.stringify(defaults));
    return defaults;
  });

  const [pageMetrics, setPageMetrics] = useState(() => ({
    visits: [],
    totalVisits: 0,
    avgSessionDuration: 0,
    uniqueVisitors: 0
  }));
  
  const [selectedFileId, setSelectedFileId] = useState(caseFiles[0]?.id || '');
  const [formData, setFormData] = useState({
    fileNo: '',
    title: '',
    artistName: '',
    officer: '',
    startDate: '',
    imageUrl: '',
    research: '',
    notes: '',
    citations: ''
  });
  
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newCommentText, setNewCommentText] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [titleInput, setTitleInput] = useState(adminCreds.title);
  const [themeInput, setThemeInput] = useState(adminCreds.theme);

  const theme = THEMES[adminCreds.theme] || THEMES.obsvr;

  useEffect(() => {
    localStorage.setItem('obsvr_case_files', JSON.stringify(caseFiles));
    localStorage.setItem('obsvr_page_metrics', JSON.stringify(pageMetrics));
  }, [caseFiles, pageMetrics]);

  useEffect(() => {
    localStorage.setItem('obsvr_admin_creds', JSON.stringify(adminCreds));
  }, [adminCreds]);

  useEffect(() => {
    if (selectedFileId) {
      const activeFile = caseFiles.find(f => f.id === selectedFileId);
      if (activeFile) {
        setFormData({ ...activeFile });
      }
    } else {
      setFormData({
        fileNo: '',
        title: '',
        artistName: '',
        officer: '',
        startDate: '',
        imageUrl: '',
        research: '',
        notes: '',
        citations: ''
      });
    }
  }, [selectedFileId, caseFiles]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput === adminCreds.username && passwordInput === adminCreds.password) {
      setIsLoggedIn(true);
      setLoginError('');
      setActiveTab('portal');
      setUsernameInput('');
      setPasswordInput('');
      showToast("Access Granted. Secure channel active.", "success");
    } else {
      setLoginError('Authentication invalid. Invalid username or password.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail) {
      setForgotError('Please enter your email address.');
      return;
    }

    if (forgotEmail !== adminCreds.email) {
      setForgotError('Email not associated with this account.');
      return;
    }

    setForgotSuccess(`Password recovery link sent to ${forgotEmail}. (Simulated)`);
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotEmail('');
    }, 3000);
  };

  const handleSetupEmail = (e) => {
    e.preventDefault();
    setEmailSetupError('');

    if (!emailInput) {
      setEmailSetupError('Email is required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailInput)) {
      setEmailSetupError('Please enter a valid email address.');
      return;
    }

    const updatedCreds = { ...adminCreds, email: emailInput };
    setAdminCreds(updatedCreds);
    setEmailInput('');
    setShowEmailSetup(false);
    showToast("Email address saved successfully.", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsernameInput('');
    setPasswordInput('');
    setActiveTab('gallery');
    setShowSettings(false);
    setPage('home');
    showToast("Logged out from portal successfully.", "info");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!newPassword || !confirmPassword) {
      setPasswordError('Both fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    const updatedCreds = { ...adminCreds, password: newPassword };
    setAdminCreds(updatedCreds);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSuccess('Password updated successfully!');
    setShowSettings(false);
    showToast("Admin credentials updated.", "success");
  };

  const handleUpdateTheme = (e) => {
    e.preventDefault();
    const updatedCreds = { ...adminCreds, title: titleInput, theme: themeInput };
    setAdminCreds(updatedCreds);
    setShowSettings(false);
    showToast(`Theme changed to ${THEMES[themeInput].name}. Title updated.`, "success");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFile = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.fileNo) {
      showToast("Missing essential parameters: Title & Core File No are required.", "error");
      return;
    }

    if (selectedFileId) {
      setCaseFiles(prev => prev.map(f => f.id === selectedFileId ? { ...formData } : f));
      showToast("Record successfully updated.", "success");
    } else {
      const newId = Date.now().toString();
      const newFile = { ...formData, id: newId };
      setCaseFiles(prev => [newFile, ...prev]);
      setSelectedFileId(newId);
      showToast("New Intelligence File generated.", "success");
    }
  };

  const handleDeleteFile = () => {
    if (!selectedFileId) return;
    const remaining = caseFiles.filter(f => f.id !== selectedFileId);
    setCaseFiles(remaining);
    setSelectedFileId(remaining[0]?.id || '');
    showToast("Classified file completely shredded.", "info");
  };

  const handleAddNewEmpty = () => {
    setSelectedFileId('');
    setFormData({
      fileNo: 'XXXXX',
      title: 'DRAFT_SUBJECT_' + Math.floor(Math.random() * 900),
      artistName: 'Unknown',
      officer: 'Agent Lea',
      startDate: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=600',
      research: 'Describe visual components here...',
      notes: '[INTERNAL USE] Keep restricted...',
      citations: ''
    });
  };

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (fileId) => {
    if (!newCommentText.trim()) return;
    const existing = comments[fileId] || [];
    setComments(prev => ({
      ...prev,
      [fileId]: [...existing, { author: 'Visitor', text: newCommentText, date: 'Just now' }]
    }));
    setNewCommentText('');
  };

  // HOME PAGE
  if (page === 'home') {
    return (
      <div style={{ backgroundColor: theme.bg }} className={`min-h-screen ${theme.text} font-sans flex flex-col`}>
        <header className={`${theme.header} backdrop-blur-md border-b ${theme.border} px-6 py-4 flex items-center justify-between sticky top-0 z-40`}>
          <div>
            <h1 className="font-serif text-lg tracking-wider uppercase font-semibold">{adminCreds.title}</h1>
            <p className="text-[10px] uppercase font-mono tracking-widest opacity-75">{theme.subtitle}</p>
          </div>
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              setPage('app');
              setActiveTab('gallery');
            }}
            className={`px-4 py-2 ${theme.primary} rounded text-xs font-mono tracking-widest uppercase transition-all`}
          >
            <Lock size={12} className="inline mr-2" />
            Enter App
          </button>
        </header>

        <main className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-light mb-6 leading-tight">
                Classified Archive System
              </h2>
              <p className="text-lg opacity-75 mb-8 leading-relaxed">
                Secure digital repository for artifact cataloging, visitor analytics, and administrative control. Multi-theme support for organizational compliance.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => { setPage('app'); setIsLoggedIn(false); setActiveTab('gallery'); }}
                  className={`block w-full md:w-auto px-6 py-3 ${theme.primary} rounded font-mono text-xs tracking-widest uppercase`}
                >
                  Launch Gallery
                </button>
                <button 
                  onClick={() => { setPage('app'); setIsLoggedIn(false); setActiveTab('login'); }}
                  className={`block w-full md:w-auto px-6 py-3 border ${theme.border} rounded font-mono text-xs tracking-widest uppercase hover:opacity-75 transition-opacity`}
                >
                  Admin Login
                </button>
              </div>
            </div>

            <div className={`border ${theme.border} rounded p-8 opacity-90`}>
              <h3 className="font-serif text-2xl mb-6">Features</h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Artifact cataloging & management</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Real-time visitor metrics & analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Multi-theme dashboard styles</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Customizable titles & branding</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Secure authentication & recovery</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className={theme.accent}>✓</span>
                  <span>Session duration tracking</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-opacity-20 pt-12 mt-12">
            <h3 className="font-serif text-2xl mb-8">Theme Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => {
                    setAdminCreds(prev => ({ ...prev, theme: key }));
                    showToast(`Theme preview: ${t.name}`, "info");
                  }}
                  className={`p-6 border ${theme.border} rounded text-left hover:opacity-80 transition-opacity`}
                >
                  <Palette size={20} className="mb-3 opacity-75" />
                  <h4 className="font-serif font-semibold mb-2">{t.name}</h4>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: t.bg }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: t.primary.split(' ')[0].replace('bg-', '').includes('stone') ? '#292521' : t.primary.includes('blue') ? '#1e40af' : '#b91c1c' }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

        <footer className={`border-t ${theme.border} mt-24 py-8 text-center opacity-60 font-mono text-xs`}>
          <p>© 2026 OBSVR Archive System. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // APP PAGE
  return (
    <div style={{ backgroundColor: theme.bg }} className={`min-h-screen ${theme.text} font-sans flex flex-col relative selection:${theme.text} pb-12`}>
      
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded shadow-2xl border flex items-center space-x-3 transition-all duration-300 ${
          toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-950' :
          toastMessage.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-950' :
          'bg-stone-900 border-stone-800 text-stone-100'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
          <p className="text-xs font-mono font-medium">{toastMessage.text}</p>
        </div>
      )}

      <header className={`${theme.header} backdrop-blur-md border-b ${theme.border} px-6 py-4 flex items-center justify-between sticky top-0 z-40`}>
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.text.split('-')[1] ? '#292521' : theme.text }}></span>
          <div>
            <h1 className="font-serif text-lg tracking-wider uppercase font-semibold">{adminCreds.title}</h1>
            <p className="text-[10px] uppercase font-mono tracking-widest opacity-75">{theme.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => { setPage('home'); setIsLoggedIn(false); }}
            className={`px-3 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 ${activeTab === 'gallery' ? theme.primary : `${theme.text} opacity-60 hover:opacity-100`}`}
          >
            Gallery
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setActiveTab('portal')}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-widest uppercase flex items-center space-x-1.5 transition-all duration-300 ${activeTab === 'portal' ? theme.primary : `opacity-60 hover:opacity-100`}`}
              >
                <FolderOpen size={12} />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => setActiveTab('metrics')}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 ${activeTab === 'metrics' ? theme.primary : `opacity-60 hover:opacity-100`}`}
              >
                📊 Metrics
              </button>
              <button 
                onClick={() => { setShowSettings(!showSettings); setTitleInput(adminCreds.title); setThemeInput(adminCreds.theme); }}
                className="p-1.5 opacity-60 hover:opacity-100 transition-colors"
                title="Settings"
              >
                <Settings size={16} />
              </button>
              <button 
                onClick={handleLogout}
                className="p-1.5 opacity-60 hover:opacity-100 transition-colors"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1.5 border ${theme.border} rounded text-xs font-mono tracking-widest uppercase flex items-center space-x-1 hover:${theme.primary} transition-all duration-300`}
            >
              <Lock size={12} />
              <span>Login</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow">
        
        {activeTab === 'gallery' && (
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
            <div className="mb-20 text-center md:text-left max-w-xl">
              <span className="text-xs font-mono tracking-widest opacity-75 uppercase block mb-3">
                // INVESTIGATION DOSSIER EXHIBITION
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-tight">
                Classified Archives
              </h2>
              <p className="opacity-75 font-light leading-relaxed text-sm md:text-base">
                Browse cataloged artifacts and investigation records.
              </p>
            </div>

            <div className="space-y-36 md:space-y-48">
              {caseFiles.length === 0 ? (
                <div className="text-center py-20 border border-dashed opacity-30 rounded">
                  <p className="font-mono text-sm">NO RECORDS FOUND.</p>
                </div>
              ) : (
                caseFiles.map((file) => (
                  <section key={file.id} className="relative group">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6 border-b opacity-30 pb-2">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider">
                        #File {file.fileNo}
                      </span>
                      <span className="text-xs font-mono opacity-75 mt-1 md:mt-0">
                        Officer: {file.officer}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-5">
                        <img 
                          src={file.imageUrl} 
                          alt={file.title} 
                          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-1000 rounded"
                        />
                      </div>

                      <div className="lg:col-span-7 flex flex-col justify-center">
                        <h3 className="font-serif text-2xl mb-4 font-medium">{file.title}</h3>
                        <p className="text-xs font-mono opacity-75 mb-6">{file.artistName}</p>
                        
                        <div className="text-sm leading-relaxed opacity-90 mb-6 space-y-3">
                          {file.research.split('\n').map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>

                        <div className="flex space-x-3 text-xs font-mono">
                          <button 
                            onClick={() => toggleLike(file.id)}
                            className={`flex items-center space-x-1 opacity-60 hover:opacity-100 transition-opacity ${likes[file.id] ? 'opacity-100' : ''}`}
                          >
                            <ThumbsUp size={14} />
                            <span>{likes[file.id] ? 'Flagged' : 'Flag'}</span>
                          </button>
                          <button 
                            onClick={() => setActiveCommentId(activeCommentId === file.id ? null : file.id)}
                            className="flex items-center space-x-1 opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <MessageSquare size={14} />
                            <span>({comments[file.id]?.length || 0})</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {activeCommentId === file.id && (
                      <div className="mt-6 p-6 border opacity-50 rounded">
                        <div className="space-y-3 max-h-32 overflow-y-auto mb-4">
                          {(comments[file.id] || []).map((c, i) => (
                            <div key={i} className="text-xs font-mono opacity-75">
                              <span className="font-semibold">{c.author}:</span> {c.text}
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <input 
                            type="text" 
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(file.id)}
                            placeholder="Add comment..."
                            className={`flex-grow border ${theme.border} rounded p-2 text-xs outline-none bg-transparent`}
                          />
                          <button 
                            onClick={() => handleAddComment(file.id)}
                            className={`${theme.primary} px-4 py-2 rounded text-xs font-mono uppercase`}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'login' && !isLoggedIn && (
          <div className="max-w-md mx-auto my-24 px-6">
            <div className={`border ${theme.border} p-8 rounded`}>
              <h3 className="font-serif text-2xl mb-4 font-medium">Admin Portal</h3>
              <p className="text-xs font-mono opacity-75 mb-6">Authenticate to access dashboard.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase opacity-75 mb-1.5">Username</label>
                  <input 
                    type="text" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="admin" 
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-mono uppercase opacity-75 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="admin" 
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  />
                </div>

                {loginError && <p className="text-xs font-mono text-red-600">{loginError}</p>}

                <button 
                  type="submit"
                  className={`w-full ${theme.primary} py-3 rounded text-xs font-mono tracking-widest uppercase`}
                >
                  Login
                </button>
              </form>

              <button 
                onClick={() => setShowForgotPassword(true)}
                className="w-full mt-4 text-xs opacity-60 hover:opacity-100 underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}

        {showSettings && isLoggedIn && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className={`border ${theme.border} p-8 rounded max-w-md w-full mx-4 bg-opacity-95`} style={{ backgroundColor: theme.bg }}>
              <h3 className="font-serif text-xl mb-6 font-medium">Dashboard Settings</h3>

              <form onSubmit={handleUpdateTheme} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-mono opacity-75 mb-1.5">Title</label>
                  <input 
                    type="text" 
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono opacity-75 mb-1.5">Theme Style</label>
                  <select 
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  >
                    {Object.entries(THEMES).map(([key, t]) => (
                      <option key={key} value={key}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  className={`w-full ${theme.primary} py-2.5 rounded text-xs font-mono tracking-widest uppercase`}
                >
                  Apply Changes
                </button>
              </form>

              <div className="mt-6 pt-6 border-t opacity-30">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full text-xs font-mono opacity-75 hover:opacity-100"
                >
                  Close
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs font-mono opacity-60">
                <div>
                  <button 
                    onClick={() => {
                      setShowSettings(false);
                      setShowForgotPassword(false);
                      const form = document.createElement('form');
                      form.innerHTML = `
                        <input type="password" id="newPwd" placeholder="New password" />
                        <input type="password" id="confirmPwd" placeholder="Confirm password" />
                      `;
                      const pwd = prompt("Enter new password (min 6 chars):");
                      if (pwd && pwd.length >= 6) {
                        const updatedCreds = { ...adminCreds, password: pwd };
                        setAdminCreds(updatedCreds);
                        showToast("Password updated.", "success");
                      }
                    }}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showForgotPassword && !isLoggedIn && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className={`border ${theme.border} p-8 rounded max-w-md w-full mx-4 bg-opacity-95`} style={{ backgroundColor: theme.bg }}>
              <h3 className="font-serif text-xl mb-6 font-medium">Password Recovery</h3>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input 
                  type="email" 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Your email" 
                  className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                />

                {forgotError && <p className="text-xs font-mono text-red-600">{forgotError}</p>}
                {forgotSuccess && <p className="text-xs font-mono text-emerald-600">{forgotSuccess}</p>}

                <button 
                  type="submit"
                  className={`w-full ${theme.primary} py-2.5 rounded text-xs font-mono tracking-widest uppercase`}
                >
                  Send Recovery Link
                </button>
              </form>

              <button 
                onClick={() => setShowForgotPassword(false)}
                className="w-full mt-4 text-xs opacity-60 hover:opacity-100"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && isLoggedIn && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-serif font-light mb-8">Visitor Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className={`border ${theme.border} p-6 rounded opacity-90`}>
                <p className="text-xs font-mono opacity-75 uppercase mb-2">Total Visits</p>
                <p className="text-4xl font-bold">{pageMetrics.totalVisits || 0}</p>
              </div>
              <div className={`border ${theme.border} p-6 rounded opacity-90`}>
                <p className="text-xs font-mono opacity-75 uppercase mb-2">Unique Visitors</p>
                <p className="text-4xl font-bold">{pageMetrics.uniqueVisitors || 0}</p>
              </div>
              <div className={`border ${theme.border} p-6 rounded opacity-90`}>
                <p className="text-xs font-mono opacity-75 uppercase mb-2">Avg Duration</p>
                <p className="text-4xl font-bold">{pageMetrics.avgSessionDuration || 0}s</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portal' && isLoggedIn && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              <div className={`w-full lg:w-1/3 border ${theme.border} p-6 rounded opacity-90`}>
                <h3 className="font-mono text-xs uppercase mb-4 opacity-75">FILE INDEX</h3>

                <div className="space-y-2 max-h-96 overflow-y-auto mb-8">
                  {caseFiles.map((file) => (
                    <button 
                      key={file.id}
                      onClick={() => setSelectedFileId(file.id)}
                      className={`w-full text-left p-3 rounded font-mono text-xs border transition-all ${selectedFileId === file.id ? theme.primary : `border ${theme.border} opacity-60 hover:opacity-100`}`}
                    >
                      #{file.fileNo} {file.title}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleAddNewEmpty}
                  className={`w-full ${theme.primary} py-2 rounded text-xs font-mono tracking-widest uppercase`}
                >
                  <Plus size={14} className="inline mr-2" />
                  New File
                </button>
              </div>

              <div className={`flex-grow w-full lg:w-2/3 border ${theme.border} p-6 md:p-8 rounded opacity-90`}>
                <h2 className="font-serif text-2xl mb-6 font-medium">
                  {selectedFileId ? 'Edit File' : 'New File'}
                </h2>

                <form onSubmit={handleSaveFile} className="space-y-4">
                  <input 
                    type="text" 
                    name="fileNo" 
                    value={formData.fileNo} 
                    onChange={handleChange} 
                    placeholder="File No" 
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  />
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Title" 
                    className={`w-full border ${theme.border} p-3 rounded font-serif text-sm outline-none bg-transparent`}
                  />
                  <input 
                    type="text" 
                    name="artistName" 
                    value={formData.artistName} 
                    onChange={handleChange} 
                    placeholder="Artist/Subject" 
                    className={`w-full border ${theme.border} p-3 rounded text-sm outline-none bg-transparent`}
                  />
                  <input 
                    type="text" 
                    name="officer" 
                    value={formData.officer} 
                    onChange={handleChange} 
                    placeholder="Officer" 
                    className={`w-full border ${theme.border} p-3 rounded text-sm outline-none bg-transparent`}
                  />
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                    className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
                  />
                  <textarea 
                    name="research" 
                    value={formData.research} 
                    onChange={handleChange} 
                    rows={4} 
                    placeholder="Research notes..." 
                    className={`w-full border ${theme.border} p-3 rounded text-sm outline-none bg-transparent font-serif`}
                  />

                  <div className="flex space-x-2 pt-4">
                    <button 
                      type="submit"
                      className={`${theme.primary} px-6 py-2 rounded text-xs font-mono tracking-widest uppercase`}
                    >
                      <Save size={12} className="inline mr-2" />
                      Save
                    </button>
                    {selectedFileId && (
                      <button 
                        type="button"
                        onClick={handleDeleteFile}
                        className="border border-red-500 text-red-500 px-6 py-2 rounded text-xs font-mono tracking-widest uppercase hover:opacity-75 transition-opacity"
                      >
                        <Trash2 size={12} className="inline mr-2" />
                        Delete
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
