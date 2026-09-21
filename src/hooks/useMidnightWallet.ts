'use client';

import { useState, useCallback } from 'react';

// Extend the Window interface to include midnight
declare global {
  interface Window {
    midnight?: {
      '1am'?: any; // The initial API injected by 1AM Wallet
    };
  }
}

/**
 * Custom hook to interface with the 1AM Wallet DApp Connector API.
 */
export const useMidnightWallet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const connectWallet = useCallback(async () => {
    try {
      setConnectionError(null);
      setIsConnecting(true);

      // Scan for the 1AM Wallet initial API
      const initialApi = window.midnight?.['1am'];
      
      if (!initialApi) {
        throw new Error('1AM Wallet not found. Please install the browser extension.');
      }

      // Request connection to the wallet for Preprod
      const connectedApi = await initialApi.connect('preprod');
      
      // Get the unshielded address
      const address = await connectedApi.getUnshieldedAddress();
      const status = await connectedApi.getConnectionStatus();

      if (status) {
        setIsConnected(true);
        setWalletAddress(address);
      } else {
        throw new Error('Wallet connected but status is false.');
      }
    } catch (err: any) {
      setConnectionError(err?.message || 'Failed to connect to the 1AM wallet.');
      setIsConnected(false);
      setWalletAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    isConnected,
    walletAddress,
    connectionError,
    connectWallet,
    isConnecting
  };
};
