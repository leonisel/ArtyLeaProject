import React, { useState } from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export default function GalleryView({ theme, caseFiles }) {
  const [likes, setLikes] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [comments, setComments] = useState({});
  const [newCommentText, setNewCommentText] = useState('');

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (fileId) => {
    if (!newCommentText.trim()) return;
    setComments(prev => ({
      ...prev,
      [fileId]: [...(prev[fileId] || []), { author: 'Visitor', text: newCommentText, date: 'Just now' }]
    }));
    setNewCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="mb-20">
        <span className="text-xs font-mono opacity-50 uppercase block mb-3">// INVESTIGATION DOSSIER EXHIBITION</span>
        <h2 className="text-4xl md:text-6xl font-serif font-light mb-6 leading-tight">Classified Archives</h2>
        <p className="opacity-75 font-light text-sm md:text-base">Browse cataloged artifacts and investigation records.</p>
      </div>

      <div className="space-y-36 md:space-y-48">
        {caseFiles.length === 0 ? (
          <div className={`text-center py-20 border border-dashed ${theme.border} rounded`}>
            <p className="font-mono text-sm opacity-50">NO RECORDS FOUND.</p>
          </div>
        ) : (
          caseFiles.map((file) => (
            <section key={file.id} className="relative group">
              <div className={`flex flex-col md:flex-row md:items-baseline md:justify-between mb-6 border-b ${theme.border} opacity-30 pb-2`}>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider">#File {file.fileNo}</span>
                <span className="text-xs font-mono opacity-75 mt-1 md:mt-0">Officer: {file.officer}</span>
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

                  <div className="flex space-x-4 text-xs font-mono">
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
                <div className={`mt-6 p-6 border ${theme.border} opacity-50 rounded`}>
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
  );
}
