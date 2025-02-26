// Set up Solana connection provider

"use client"; // The component runs on client side

import React, { useMemo } from "react";
import {
  ConnectionProvider, // provides Solana connection
  WalletProvider, // manages connected wallets
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// Burner wallet
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// Default styles that can be overridden
import "@solana/wallet-adapter-react-ui/styles.css";

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Devnet; // define network (Devnet is for testing)
  const endpoint = useMemo(() => clusterApiUrl(network), [network]); // ? cluster
  // Initialize wallets
  const wallets = useMemo(
    () => [
      // Uncomment the line below to enable it for testing
      // new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}