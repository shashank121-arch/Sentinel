"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Database, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchReports } from "@/services/sentinelService";

export function LedgerDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [reports, setReports] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchReports().then((data) => {
        setReports(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full glass-panel border-r-0 border-t-0 border-b-0 flex flex-col bg-black/80"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold tracking-wide">PUBLIC LEDGER</h2>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search verified disclosures..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="text-center text-sm text-gray-500 py-10 animate-pulse">
                  Syncing with Midnight Preprod...
                </div>
              ) : reports.length > 0 ? (
                reports.map((report, idx) => (
                  <div key={idx} className="p-5 glass-panel rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-indigo-400">INDEX #{String(idx).padStart(4, '0')}</span>
                      <span className="text-[10px] uppercase tracking-widest text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {report}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500 py-10">
                  No disclosures found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
