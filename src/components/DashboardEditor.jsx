import React, { useState } from 'react';
import { Plus, Save, Trash2, Download, Upload } from 'lucide-react';

export default function DashboardEditor({ theme, caseFiles, setCaseFiles, showToast, onExport, onImport }) {
  const [selectedFileId, setSelectedFileId] = useState(caseFiles[0]?.id || '');
  const [formData, setFormData] = useState(() => {
    const activeFile = caseFiles.find(f => f.id === (caseFiles[0]?.id || ''));
    return activeFile || {
      fileNo: '',
      title: '',
      artistName: '',
      officer: '',
      startDate: '',
      imageUrl: '',
      research: '',
      notes: '',
      citations: ''
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFile = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.fileNo) {
      showToast("Title and File No are required.", "error");
      return;
    }

    if (selectedFileId) {
      setCaseFiles(prev => prev.map(f => f.id === selectedFileId ? { ...formData, id: f.id } : f));
      showToast("File updated.", "success");
    } else {
      const newId = Date.now().toString();
      setCaseFiles(prev => [{ ...formData, id: newId }, ...prev]);
      setSelectedFileId(newId);
      showToast("New file created.", "success");
    }
  };

  const handleDeleteFile = () => {
    if (!selectedFileId) return;
    if (confirm('Delete this file?')) {
      const remaining = caseFiles.filter(f => f.id !== selectedFileId);
      setCaseFiles(remaining);
      setSelectedFileId(remaining[0]?.id || '');
      showToast("File deleted.", "info");
    }
  };

  const handleAddNewEmpty = () => {
    setSelectedFileId('');
    setFormData({
      fileNo: 'XXXXX',
      title: 'NEW_FILE_' + Math.floor(Math.random() * 999),
      artistName: 'Unknown',
      officer: 'Agent Lea',
      startDate: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=600',
      research: '',
      notes: '',
      citations: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <div className={`w-full lg:w-1/3 border ${theme.border} p-6 rounded opacity-90`}>
          <h3 className="font-mono text-xs uppercase mb-4 opacity-75">FILE INDEX</h3>

          <div className="space-y-2 max-h-96 overflow-y-auto mb-8">
            {caseFiles.map((file) => (
              <button 
                key={file.id}
                onClick={() => {
                  setSelectedFileId(file.id);
                  setFormData(file);
                }}
                className={`w-full text-left p-3 rounded font-mono text-xs border transition-all ${selectedFileId === file.id ? theme.primary : `border ${theme.border} opacity-60 hover:opacity-100`}`}
              >
                #{file.fileNo} {file.title}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <button 
              onClick={handleAddNewEmpty}
              className={`w-full ${theme.primary} py-2 rounded text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2`}
            >
              <Plus size={14} />
              <span>New File</span>
            </button>
            <button 
              onClick={onExport}
              className={`w-full border ${theme.border} py-2 rounded text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2 opacity-60 hover:opacity-100`}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
            <button 
              onClick={onImport}
              className={`w-full border ${theme.border} py-2 rounded text-xs font-mono tracking-widest uppercase flex items-center justify-center space-x-2 opacity-60 hover:opacity-100`}
            >
              <Upload size={14} />
              <span>Import</span>
            </button>
          </div>
        </div>

        <div className={`flex-grow w-full lg:w-2/3 border ${theme.border} p-6 md:p-8 rounded opacity-90`}>
          <h2 className="font-serif text-2xl mb-6 font-medium">
            {selectedFileId ? 'Edit File' : 'New File'}
          </h2>

          <form onSubmit={handleSaveFile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="fileNo" 
                value={formData.fileNo} 
                onChange={handleChange} 
                placeholder="File No" 
                className={`border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
              />
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Title" 
                className={`border ${theme.border} p-3 rounded font-serif text-sm outline-none bg-transparent`}
              />
              <input 
                type="text" 
                name="artistName" 
                value={formData.artistName} 
                onChange={handleChange} 
                placeholder="Artist/Subject" 
                className={`border ${theme.border} p-3 rounded text-sm outline-none bg-transparent`}
              />
              <input 
                type="text" 
                name="officer" 
                value={formData.officer} 
                onChange={handleChange} 
                placeholder="Officer" 
                className={`border ${theme.border} p-3 rounded text-sm outline-none bg-transparent`}
              />
            </div>

            <input 
              type="date" 
              name="startDate" 
              value={formData.startDate} 
              onChange={handleChange} 
              className={`w-full border ${theme.border} p-3 rounded font-mono text-sm outline-none bg-transparent`}
            />
            <input 
              type="text" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleChange} 
              placeholder="Image URL" 
              className={`w-full border ${theme.border} p-3 rounded font-mono text-xs outline-none bg-transparent`}
            />
            
            <textarea 
              name="research" 
              value={formData.research} 
              onChange={handleChange} 
              rows={4} 
              placeholder="Research notes..." 
              className={`w-full border ${theme.border} p-3 rounded text-sm outline-none bg-transparent font-serif`}
            />

            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              rows={3} 
              placeholder="Internal notes..." 
              className={`w-full border ${theme.border} p-3 rounded text-sm outline-none bg-transparent font-mono`}
            />

            <textarea 
              name="citations" 
              value={formData.citations} 
              onChange={handleChange} 
              rows={2} 
              placeholder="Citations..." 
              className={`w-full border ${theme.border} p-3 rounded text-xs outline-none bg-transparent font-mono`}
            />

            <div className="flex space-x-2 pt-4">
              <button 
                type="submit"
                className={`${theme.primary} px-6 py-2 rounded text-xs font-mono tracking-widest uppercase flex items-center space-x-2`}
              >
                <Save size={12} />
                <span>Save</span>
              </button>
              {selectedFileId && (
                <button 
                  type="button"
                  onClick={handleDeleteFile}
                  className={`border border-red-500 text-red-500 px-6 py-2 rounded text-xs font-mono tracking-widest uppercase flex items-center space-x-2 hover:opacity-75`}
                >
                  <Trash2 size={12} />
                  <span>Delete</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
