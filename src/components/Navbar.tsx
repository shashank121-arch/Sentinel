"use client";

import { useState, useEffect } from "react";
import { useMidnightWallet } from "@/hooks/useMidnightWallet";

export function Navbar() {
  const { isConnected, walletAddress, connectWallet, isConnecting } = useMidnightWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const displayAddress = walletAddress
    ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
    : "";

  return (
    <>
      <header className="nav">
        <a href="#" className="logo">
          Sentinel
        </a>

        <nav aria-label="Primary" className="nav-links">
          <a href="#">Manifesto</a>
          <a href="#">Circuits</a>
          <a href="#">Public Ledger</a>
        </nav>

        <div className="nav-actions">
          <button
            onClick={!isConnected && !isConnecting ? connectWallet : undefined}
            className={`btn btn-nav-start ${isConnected ? "is-connected" : ""}`}
            disabled={isConnecting}
          >
            {isConnected ? displayAddress : isConnecting ? "Connecting..." : "Connect 1a.m."}
            {!isConnected && !isConnecting && (
              <svg className="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                <path
                  d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          id="burger"
          className="burger"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          onClick={toggleMenu}
        >
          <span></span>
        </button>
      </header>

      <nav
        className={`menu ${isMenuOpen ? "open" : ""}`}
        id="menu"
        aria-label="Mobile"
      >
        <a href="#" onClick={closeMenu}>
          Manifesto
        </a>
        <a href="#" onClick={closeMenu}>
          Circuits
        </a>
        <a href="#" onClick={closeMenu}>
          Public Ledger
        </a>
        <div className="divider"></div>
        <button
          className="btn m-start"
          onClick={() => {
            if (!isConnected && !isConnecting) connectWallet();
            closeMenu();
          }}
          disabled={isConnecting}
        >
          {isConnected ? displayAddress : isConnecting ? "Connecting..." : "Connect 1a.m."}
          {!isConnected && !isConnecting && (
            <svg className="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true">
              <path
                d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </nav>
    </>
  );
}
