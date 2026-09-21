"use client";

import { useEffect, useState } from 'react';
import { initMidnightProvider } from '@/utils/midnightProvider';
import { Navbar } from '@/components/Navbar';
import { ReportModal } from '@/components/ReportModal';
import { LedgerDrawer } from '@/components/LedgerDrawer';
import { BackgroundEngine } from '@/components/BackgroundEngine';
import { submitReport } from '@/services/sentinelService';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    initMidnightProvider();
  }, []);

  // ENTRANCE SEQUENCE SCRIPT
  useEffect(() => {
    if (!isClient) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // Do nothing
    }

    const start = () => {
      document.documentElement.classList.add("go");
    };

    document.documentElement.classList.add("anim");

    const bootTimeout = setTimeout(start, 900);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(bootTimeout);
        start();
      }, () => {
        clearTimeout(bootTimeout);
        start();
      });
    }

    const onEnd = (e: AnimationEvent) => {
      if (e.animationName === "pillIn" && (e.target as HTMLElement).classList.contains("btn-ghost")) {
        clean();
      }
    };

    const safetyTimeout = setTimeout(clean, 2600);

    function clean() {
      clearTimeout(safetyTimeout);
      document.removeEventListener("animationend", onEnd, true);
      document.documentElement.classList.remove("anim", "go");
    }

    document.addEventListener("animationend", onEnd, true);

    return () => {
      clean();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <main className="hero">
      <BackgroundEngine />
      <Navbar />

      <div className="hero-inner">
        <h1>
          <span className="ln"><span className="ln-i">Speak truth.</span></span>
          <span className="ln"><span className="ln-i">Leave no trace.</span></span>
        </h1>
        <p className="sub">
          Submit verifiable whistleblower reports through zero-knowledge proofs.<br />
          The ledger guarantees authenticity, cryptography guarantees your anonymity.
        </p>
        <div className="ctas">
          <button 
            className="btn btn-lg btn-primary"
            onClick={() => setIsReportModalOpen(true)}
          >
            File Disclosure
            <svg className="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="btn btn-lg btn-ghost"
            onClick={() => setIsLedgerOpen(true)}
          >
            Browse Ledger
            <svg className="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        onSubmit={submitReport}
      />
      <LedgerDrawer 
        isOpen={isLedgerOpen} 
        onClose={() => setIsLedgerOpen(false)} 
      />
    </main>
  );
}
