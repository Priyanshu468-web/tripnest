import React, { useState } from 'react';
import { FileText, Download, Upload, Trash2, Eye, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Documents = () => {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState([
    { id: 1, name: 'Passport_Scan_Alexander.pdf', size: '1.2 MB', category: 'Identification', date: 'Jul 01, 2026' },
    { id: 2, name: 'Flight_Zurich_LX14_Ticket.pdf', size: '480 KB', category: 'Tickets', date: 'Jul 03, 2026' },
    { id: 3, name: 'Hotel_Grindelwald_Voucher.pdf', size: '320 KB', category: 'Accommodations', date: 'Jul 04, 2026' },
    { id: 4, name: 'Travel_Insurance_Policy.pdf', size: '2.5 MB', category: 'Insurance', date: 'Jul 05, 2026' }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'Tickets'
  });

  const handleDownload = (name) => {
    toast.success(`Started download for ${name}`);
  };

  const handlePreview = (name) => {
    toast.success(`Opening preview window for ${name}`);
  };

  const handleDelete = (id) => {
    setDocs(docs.filter(d => d.id !== id));
    toast.success('Document deleted from safe.');
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDoc.name) {
      toast.error('Please enter a document filename.');
      return;
    }

    const created = {
      id: Date.now(),
      name: newDoc.name.endsWith('.pdf') ? newDoc.name : `${newDoc.name}.pdf`,
      size: `${(Math.random() * 2 + 0.1).toFixed(1)} MB`,
      category: newDoc.category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setDocs([created, ...docs]);
    setNewDoc({ name: '', category: 'Tickets' });
    setShowUploadModal(false);
    toast.success('Document uploaded to safe successfully! 🌌');
  };

  const filteredDocs = docs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
            Document Safe
          </h2>
          <p className="text-sm text-muted">
            Keep copies of passports, transit passes, and hotel vouchers secure.
          </p>
        </div>

        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-glow-primary flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input 
          type="text" 
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200"
        />
      </div>

      {/* Grid of Documents */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-5 flex flex-col justify-between group h-44 hover:border-accent/20 transition-all duration-300 hover:scale-105"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-accent/10 text-accent rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-void text-muted rounded border border-white/5">
                    {doc.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs truncate text-light" title={doc.name}>
                    {doc.name}
                  </h4>
                  <span className="text-[10px] text-muted block mt-0.5">
                    {doc.size} • {doc.date}
                  </span>
                </div>
              </div>

              {/* Hover actions */}
              <div className="flex justify-end gap-1.5 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handlePreview(doc.name)}
                  className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/5 transition-all"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDownload(doc.name)}
                  className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/5 transition-all"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/5 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4">
          <FileText className="w-12 h-12 text-muted mx-auto" />
          <h3 className="font-bold text-light font-display">No Documents Found</h3>
          <p className="text-sm text-muted">We couldn't locate any files matching "{search}".</p>
        </div>
      )}

      {/* Upload Dialog overlay */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-void/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-surface/90 border border-white/10 p-6 rounded-2xl shadow-glass-lg z-10"
            >
              <h3 className="font-bold text-lg text-light mb-4 font-display">Upload Document</h3>
              
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="name">Document Filename</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="e.g. Booking_Voucher"
                    value={newDoc.name}
                    onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="category">Category</label>
                  <select 
                    id="category"
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({...newDoc, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                  >
                    <option value="Tickets">Tickets</option>
                    <option value="Identification">Identification</option>
                    <option value="Accommodations">Accommodations</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>

                <div className="flex gap-4 justify-end pt-2">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="btn-glow-secondary">Cancel</button>
                  <button type="submit" className="btn-glow-primary">Upload</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Documents;
