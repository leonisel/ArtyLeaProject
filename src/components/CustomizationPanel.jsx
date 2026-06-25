import React, { useState } from 'react';
import { Palette, Type, Eye } from 'lucide-react';

export default function CustomizationPanel({ theme, adminCreds, onUpdateCreds, onClose, showToast }) {
  const [title, setTitle] = useState(adminCreds.title);
  const [subtitle, setSubtitle] = useState(adminCreds.subtitle || '');
  const [theme_sel, setTheme_sel] = useState(adminCreds.theme);
  const [bgColor, setBgColor] = useState(adminCreds.bgColor || '#FDFCF7');
  const [primaryColor, setPrimaryColor] = useState(adminCreds.primaryColor || '#292521');
  const [headerOpacity, setHeaderOpacity] = useState(adminCreds.headerOpacity || '95');
  const [buttonRadius, setButtonRadius] = useState(adminCreds.buttonRadius || '4');
  const [fontSize, setFontSize] = useState(adminCreds.fontSize || 'sm');
  const [fontFamily, setFontFamily] = useState(adminCreds.fontFamily || 'sans');
  const [borderColor, setBorderColor] = useState(adminCreds.borderColor || '#E7E5E4');
  const [accentColor, setAccentColor] = useState(adminCreds.accentColor || '#10B981');
  const [error, setError] = useState('');

  const THEMES = {
    obsvr: 'OBSVR (Initial)',
    uk: 'UK Official',
    secret: 'Secret Organization'
  };

  const handleApply = (e) => {
    e.preventDefault();
    setError('');

    const updated = {
      ...adminCreds,
      title,
      subtitle,
      theme: theme_sel,
      bgColor,
      primaryColor,
      headerOpacity,
      buttonRadius,
      fontSize,
      fontFamily,
      borderColor,
      accentColor
    };

    onUpdateCreds(updated);
    showToast('Site customization applied.', 'success');
    onClose();
  };

  const handleReset = () => {
    if (confirm('Reset all customizations to defaults?')) {
      const defaults = {
        ...adminCreds,
        title: 'OBSVR',
        subtitle: '',
        theme: 'obsvr',
        bgColor: '#FDFCF7',
        primaryColor: '#292521',
        headerOpacity: '95',
        buttonRadius: '4',
        fontSize: 'sm',
        fontFamily: 'sans',
        borderColor: '#E7E5E4',
        accentColor: '#10B981'
      };
      onUpdateCreds(defaults);
      showToast('Customizations reset to defaults.', 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="border border-gray-300 p-8 rounded max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white text-black">
        
        <h2 className="font-serif text-2xl mb-6 font-medium flex items-center space-x-2">
          <Palette size={24} className="text-blue-600" />
          <span>Site Customization</span>
        </h2>

        <form onSubmit={handleApply} className="space-y-6">

          {/* Branding */}
          <div className="border-b border-gray-300 pb-6">
            <h3 className="text-sm font-mono uppercase mb-4 text-black font-bold flex items-center space-x-2">
              <Type size={16} />
              <span>Branding</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono mb-2 text-black">Site Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., OBSVR"
                  className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Subtitle / Tagline</label>
                <input 
                  type="text" 
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g., Arty Lea's Research Beero"
                  className="w-full border border-gray-400 p-3 rounded font-mono text-xs outline-none bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Theme Preset</label>
                <select 
                  value={theme_sel}
                  onChange={(e) => setTheme_sel(e.target.value)}
                  className="w-full border border-gray-400 p-3 rounded font-mono text-sm outline-none bg-white text-black"
                >
                  {Object.entries(THEMES).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="border-b border-gray-300 pb-6">
            <h3 className="text-sm font-mono uppercase mb-4 text-black font-bold">Colors</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono mb-2 text-black">Background Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-gray-400"
                  />
                  <input 
                    type="text" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-grow border border-gray-400 p-2 rounded font-mono text-xs outline-none bg-white text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Primary Button Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-gray-400"
                  />
                  <input 
                    type="text" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-grow border border-gray-400 p-2 rounded font-mono text-xs outline-none bg-white text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Border Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-gray-400"
                  />
                  <input 
                    type="text" 
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="flex-grow border border-gray-400 p-2 rounded font-mono text-xs outline-none bg-white text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Accent Color</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer border border-gray-400"
                  />
                  <input 
                    type="text" 
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-grow border border-gray-400 p-2 rounded font-mono text-xs outline-none bg-white text-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Design */}
          <div className="border-b border-gray-300 pb-6">
            <h3 className="text-sm font-mono uppercase mb-4 text-black font-bold flex items-center space-x-2">
              <Eye size={16} />
              <span>Design</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono mb-2 text-black">Button Border Radius (px)</label>
                <input 
                  type="number" 
                  value={buttonRadius}
                  onChange={(e) => setButtonRadius(e.target.value)}
                  min="0"
                  max="20"
                  className="w-full border border-gray-400 p-2 rounded font-mono text-sm outline-none bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Header Opacity (%)</label>
                <input 
                  type="number" 
                  value={headerOpacity}
                  onChange={(e) => setHeaderOpacity(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-gray-400 p-2 rounded font-mono text-sm outline-none bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Font Size</label>
                <select 
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full border border-gray-400 p-2 rounded font-mono text-sm outline-none bg-white text-black"
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono mb-2 text-black">Font Family</label>
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full border border-gray-400 p-2 rounded font-mono text-sm outline-none bg-white text-black"
                >
                  <option value="sans">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                </select>
              </div>
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex space-x-3">
            <button 
              type="submit"
              className="flex-grow bg-blue-600 text-white py-3 rounded text-xs font-mono tracking-widest uppercase hover:bg-blue-700 font-bold"
            >
              Apply Customizations
            </button>

            <button 
              type="button"
              onClick={handleReset}
              className="px-4 py-3 border border-red-400 text-red-600 rounded text-xs font-mono tracking-widest uppercase hover:bg-red-50"
            >
              Reset
            </button>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="w-full border border-gray-400 py-2.5 rounded text-xs font-mono tracking-widest uppercase text-black hover:bg-gray-100"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
