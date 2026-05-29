import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Check, AlertCircle, FileImage, Sparkles } from 'lucide-react';

export default function UploadModal({ onClose, onUploadSuccess }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Environment');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [tagsInput, setTagsInput] = useState('');
  const [softwareInput, setSoftwareInput] = useState('');

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null); 

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image file types (PNG, JPG, JPEG, WEBP) are valid!');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('File exceeds size limit of 8 megabytes!');
      return;
    }

    setUploadError(null);
    setImageFile(file);

    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const finalImage = imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop';

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {

            const tags = tagsInput
              .split(',')
              .map(t => t.trim().toLowerCase())
              .filter(t => t.length > 0);

            const software = softwareInput
              .split(',')
              .map(s => s.trim())
              .filter(s => s.length > 0);

            const newArtwork = {
              id: Math.random().toString(36).substring(2, 9),
              title: title.trim() || 'Untitled Gem',
              artist: {
                name: 'Creative Critic',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', 
                handle: 'creativecritic',
                followedByMe: false,
                role: 'Digital Creator'
              },
              image: finalImage,
              category,
              description: description.trim(),
              likes: 0,
              likedByMe: false,
              views: 1,
              tags: tags.length > 0 ? tags : ['custom', 'artist', 'creative'],
              software: software.length > 0 ? software : ['Digital Tool'],
              createdAt: new Date().toISOString().split('T')[0],
              comments: [],
              brandOverlay: undefined
            };

            onUploadSuccess(newArtwork);
          }, 300);

          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 md:p-6 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl rounded bg-brand-surface border border-brand-border/60 p-6 md:p-8 space-y-6 shadow-2xl text-left"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-sm bg-neutral-900 hover:bg-neutral-850 p-1.5 text-neutral-400 hover:text-white border border-brand-border/40 transition-colors cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="h-5 w-5 text-brand-accent scale-110" />
          <div>
            <h2 className="font-sans text-sm md:text-base font-black text-white uppercase tracking-wider">
              Add Creative Performance
            </h2>
            <p className="text-[10px] text-neutral-500 mt-0.5">
              Submit your master, environment, character design or 3D asset into the Obsidian global feed.
            </p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-[220px] rounded border border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer select-none transition-colors overflow-hidden ${
                dragActive
                  ? 'bg-neutral-900 border-brand-accent text-brand-accent'
                  : imageFile
                  ? 'bg-neutral-950 border-brand-border hover:border-brand-accent/40'
                  : 'bg-neutral-900/40 border-brand-border/60 hover:border-brand-accent'
              }`}
            >
              {imageUrl ? (

                <>
                  <img
                    src={imageUrl}
                    alt="Drop Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-neutral-950/60 flex flex-col items-center justify-center p-2">
                    <Check className="h-6 w-6 text-brand-accent" />
                    <p className="text-[10px] font-bold text-white mt-1">Image Loaded Perfectly</p>
                    <p className="text-[9px] text-neutral-400 font-mono mt-0.5 mt-1">{imageFile ? imageFile.name : 'Custom Link Asset'}</p>
                  </div>
                </>
              ) : (

                <div className="space-y-2">
                  <div className="mx-auto h-10 w-10 bg-neutral-950/80 rounded-full border border-brand-border/40 flex items-center justify-center">
                    <Upload className="h-4.5 w-4.5 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white">Drag and drop file here</p>
                    <p className="text-[9.5px] text-neutral-500 mt-0.5">or click to choose image from folders</p>
                  </div>
                  <p className="text-[8px] text-neutral-500 font-mono">PNG, WEBP, or JPG up to 8MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="space-y-4 flex flex-col justify-between">

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block">
                  Artwork Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Iron Sentinel Study"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border border-brand-border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block">
                  Fallback Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/your-art..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded border border-brand-border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                />
                <p className="text-[8.5px] font-mono text-neutral-500">Provide an online image link if file drops are unavailable.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block pb-1">
                  Feed Channel Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Characters', '3D', 'Environment', 'Illustration'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold uppercase transition-all border cursor-pointer shrink-0 ${
                        category === cat
                          ? 'bg-neutral-900 text-brand-accent border-brand-accent/50'
                          : 'bg-neutral-950/40 border-brand-border/60 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          <div className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block">
                  Software Stack (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Blender, Photoshop, ZBrush..."
                  value={softwareInput}
                  onChange={(e) => setSoftwareInput(e.target.value)}
                  className="w-full rounded border border-brand-border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                />
              </div>

              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block">
                  Hashtags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="scifi, character, hardsurface..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded border border-brand-border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                />
              </div>

            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-400 block">
                Portfolio Description & Modeling Details
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your techniques on sub-polygon displacements, lighting, matte painting, or mesh topologies..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border border-brand-border bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              />
            </div>

          </div>

          <AnimatePresence>
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded bg-rose-950/40 p-2.5 px-3 border border-rose-900/50 flex items-center gap-2 text-rose-400 text-xs text-left"
              >
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{uploadError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {uploadProgress !== null && (
            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400">
                <span>SIMULATED BLOCKCHAIN PORTFOLIO DEPLOYMENT...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-950 rounded overflow-hidden">
                <div 
                  className="h-full bg-brand-accent transition-all duration-100 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-brand-border/40 pt-4 cursor-pointer">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-brand-border/80 hover:border-white px-5 py-2 text-[10px] font-bold text-white transition-all uppercase tracking-wider font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploadProgress !== null}
              className="rounded bg-brand-accent hover:bg-emerald-400 text-neutral-950 font-sans text-[10.5px] font-black uppercase tracking-wider py-2 px-6 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              Deploy Masterpiece
            </button>
          </div>

        </form>

      </motion.div>
    </div>
  );
}
