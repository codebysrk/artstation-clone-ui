import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Heart, Eye, MessageSquare, Send, Calendar, Monitor, Sparkles, UserPlus, UserCheck } from 'lucide-react';

export default function ArtworkDetailModal({
  artwork,
  onClose,
  onLikeToggle,
  onFollowToggle,
  onAddComment
}) {
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState('details'); 

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText.trim());
    setCommentText('');
    setActiveTab('comments'); 
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 md:p-6 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col md:flex-row overflow-hidden rounded bg-brand-surface border border-brand-border/60 shadow-2xl text-left"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-neutral-400 hover:text-white border border-white/10 hover:bg-black/80 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex flex-1 items-center justify-center bg-neutral-950 p-2 md:p-4 border-r border-brand-border/40 select-none overflow-hidden h-[40vh] md:h-auto shrink-0 md:shrink">
          <img
            src={artwork.image}
            alt={artwork.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full rounded object-contain shadow-lg"
          />

          <div 
            className="absolute -inset-10 opacity-15 blur-3xl pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${artwork.brandOverlay ? '#00eeff' : '#00ffd0'} 0%, transparent 70%)`
            }}
          />

          <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap pointer-events-none pt-2">
            {artwork.software?.slice(0, 4).map((soft) => (
              <span key={soft} className="rounded-sm bg-neutral-950/80 backdrop-blur-xs border border-white/10 text-[9px] font-mono text-neutral-300 font-medium p-1 px-2 uppercase shadow-md">
                {soft}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full md:w-[420px] flex-col justify-between bg-brand-surface h-[52vh] md:h-auto">

          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">

            <div className="flex items-center justify-between border-b border-brand-border/40 pb-4">
              <div className="flex items-center gap-3">
                {artwork.artist.avatar ? (
                  <img
                    src={artwork.artist.avatar}
                    alt={artwork.artist.name}
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover border border-brand-border"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full bg-brand-accent/20 flex items-center justify-center text-sm text-brand-accent font-bold">
                    {artwork.artist.name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <h4 className="font-hanken text-sm font-bold text-white hover:text-brand-accent transition-colors">
                    {artwork.artist.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400">@{artwork.artist.handle}</p>
                  <p className="text-[9px] font-medium text-brand-accent/70 font-mono tracking-wide mt-0.5">{artwork.artist.role || 'Talented Artist'}</p>
                </div>
              </div>

              <button
                onClick={onFollowToggle}
                className={`flex items-center gap-1.5 rounded-sm p-1.5 px-3 text-[10px] font-bold uppercase transition-all tracking-wider font-sans cursor-pointer ${
                  artwork.artist.followedByMe
                    ? 'bg-neutral-800 text-brand-accent border border-brand-accent/40 hover:bg-neutral-850'
                    : 'bg-brand-accent hover:bg-emerald-400 text-neutral-950'
                }`}
              >
                {artwork.artist.followedByMe ? (
                  <>
                    <UserCheck className="h-3 w-3" /> Followed
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3 w-3" /> Follow
                  </>
                )}
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded bg-neutral-900 border border-brand-border/60 px-2 py-0.5 font-mono text-[9px] text-brand-accent font-semibold uppercase tracking-wider">
                  {artwork.category}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {artwork.createdAt}
                </span>
              </div>
              <h1 className="font-hanken text-xl font-bold text-white tracking-wide">
                {artwork.title}
              </h1>
              <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                {artwork.description || 'Professional portfolio submission demonstrating advanced hard-surface modeling, complex materials, texture shaders, and lighting setups.'}
              </p>
            </div>

            <div className="flex border-b border-brand-border/40">
              <button
                onClick={() => setActiveTab('details')}
                className={`p-2.5 px-4 font-sans text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
                  activeTab === 'details' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Metadata Details
                {activeTab === 'details' && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`p-2.5 px-4 font-sans text-xs font-bold uppercase tracking-wider relative flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'comments' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Comments ({artwork.comments.length})
                {activeTab === 'comments' && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-accent" />
                )}
              </button>
            </div>

            <div>
              {activeTab === 'details' ? (

                <div className="space-y-4">

                  <div className="rounded border border-brand-border/40 bg-neutral-900/40 p-3 flex items-start gap-3">
                    <Monitor className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-300 font-mono uppercase tracking-wide">Software Stack</h4>
                      <p className="text-[11px] text-neutral-400 mt-1 flex flex-wrap gap-1.5">
                        {artwork.software && artwork.software.length > 0 
                          ? artwork.software.map(s => (
                              <span key={s} className="rounded bg-neutral-900 border border-brand-border/40 p-0.5 px-1.5 font-mono text-[9px] text-[#00ffcc]">
                                {s}
                              </span>
                            ))
                          : 'Photoshop, ZBrush, Blender'}
                      </p>
                    </div>
                  </div>

                  <div className="rounded border border-brand-border/40 bg-neutral-900/40 p-3 flex items-start gap-3">
                    <Sparkles className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-neutral-300 font-mono uppercase tracking-wide">Submission Tags</h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {artwork.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm bg-neutral-850 px-2 py-0.5 text-[9.5px] text-neutral-400 font-mono border border-brand-border/30 hover:border-brand-accent/30 cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (

                <div className="space-y-4">
                  {artwork.comments.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-500 space-y-1">
                      <p className="font-semibold text-neutral-400">Silence Speaks Volumes</p>
                      <p>Be the first to critique or praise this masterpiece above.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-brand-border/35 space-y-3">
                      {artwork.comments.map((comm) => (
                        <div key={comm.id} className="pt-3 first:pt-0 flex items-start gap-2.5 text-left">
                          <img
                            src={comm.avatar}
                            alt={comm.userName}
                            referrerPolicy="no-referrer"
                            className="h-7 w-7 rounded-full object-cover shrink-0 border border-brand-border/50"
                          />
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[11px] font-bold text-white">{comm.userName}</span>
                              <span className="text-[8px] text-neutral-500 font-mono">{comm.timestamp}</span>
                            </div>
                            <p className="text-[11.5px] text-neutral-300 leading-relaxed mt-0.5 select-text">
                              {comm.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          <div className="border-t border-brand-border/60 bg-neutral-900/60 p-4 space-y-4 shadow-xl">

            <div className="flex items-center justify-between select-none">
              <div className="flex items-center gap-5 text-xs text-neutral-400 font-mono">
                <button
                  onClick={onLikeToggle}
                  className={`flex items-center gap-1 hover:text-brand-accent transition-colors ${
                    artwork.likedByMe ? 'text-brand-accent font-semibold scale-110' : ''
                  }`}
                >
                  <Heart className={`h-4.5 w-4.5 ${artwork.likedByMe ? 'fill-brand-accent stroke-brand-accent' : ''}`} />
                  <span>{artwork.likes} likes</span>
                </button>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{artwork.views} views</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitComment} className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Give feedback on lighting or materials..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 rounded border border-brand-border/80 bg-neutral-950 px-3.5 py-2 text-xs text-white placeholder-neutral-500 outline-hidden hover:border-neutral-700 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="rounded bg-neutral-800 hover:bg-neutral-750 px-3.5 text-brand-accent hover:text-emerald-400 border border-brand-border/60 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Publish comment"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
