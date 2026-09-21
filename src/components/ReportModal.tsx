"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Loader2 } from "lucide-react";

export interface ReportPayload {
  orgKey: string;
  category: string;
  report: string;
}

export function ReportModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (payload: ReportPayload) => Promise<string> }) {
  const [orgKey, setOrgKey] = useState("");
  const [category, setCategory] = useState("");
  const [report, setReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTx, setSubmittedTx] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!report.trim() || !orgKey.trim() || !category.trim()) return;
    setIsSubmitting(true);
    try {
      const txId = await onSubmit({ orgKey, category, report });
      setSubmittedTx(txId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl p-8 glass-panel rounded-2xl shadow-2xl flex flex-col"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-2">Submit Classified Report</h2>
            <p className="text-gray-400 text-sm mb-6">
              Your identity is protected by zero-knowledge proofs. Only the verified payload will be appended to the Midnight ledger.
            </p>

            {!submittedTx ? (
              <>
                <input
                  type="password"
                  value={orgKey}
                  onChange={(e) => setOrgKey(e.target.value)}
                  placeholder="Organization Secret Key"
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors mb-4"
                />
                
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category (e.g. Financial Fraud, Safety)"
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors mb-4"
                />

                <textarea
                  value={report}
                  onChange={(e) => setReport(e.target.value)}
                  placeholder="Describe the incident securely..."
                  className="w-full h-40 p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none mb-6"
                />

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !report.trim() || !orgKey.trim() || !category.trim()}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>GENERATING ZK PROOF...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>AUTHORIZE DISCLOSURE</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Disclosure Verified</h3>
                <p className="text-sm text-gray-400 text-center">
                  Zero-knowledge proof validated. Payload secured on the Preprod ledger.
                </p>
                <div className="w-full mt-4 p-3 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-gray-300 break-all text-center">
                  TX: {submittedTx}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
