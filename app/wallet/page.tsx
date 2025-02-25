"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"; // Button to connect/disconnect Solana wallet
import { useConnection, useWallet } from "@solana/wallet-adapter-react"; // for wallet connection hooks
import { LAMPORTS_PER_SOL } from "@solana/web3.js"; // A conversion constant
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { connection } = useConnection(); // Get Solana connection object
  const { publicKey } = useWallet(); // Get the public key of the connected wallet
  const [balance, setBalance] = useState<number | null>(null); // State to store wallet balance

  // Function to request an airdrop
  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) {
        throw new Error("Wallet is not Connected");
      }
      // Fetch latest blockhash
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);
      // Confirm the transaction
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );
      // Notify the user if the airdrop is
      if (sigResult) {
        alert("Airdrop was confirmed!"); // successful
      }
    } catch (err) {
      alert("You are Rate limited for Airdrop"); // Too many requests
    }
  };

  // Update wallet balance every 10 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function getBalanceEvery10Seconds() {
      if (publicKey) {
        try {
          const newBalance = await connection.getBalance(publicKey);
          setBalance(newBalance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      }
      timeoutId = setTimeout(getBalanceEvery10Seconds, 10000);
    }

    getBalanceEvery10Seconds();

    return () => clearTimeout(timeoutId);
  }, [publicKey, connection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* header */}
      <header className="p-6 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Solana Wallet Interface</h1>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition-colors" />
        </div>
      </header>
      {/* main content */}
      <main className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
          
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">
              Wallet Dashboard
            </CardTitle>
            <CardDescription className="text-gray-400">
              Connect your wallet to view balance and request airdrops
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {publicKey ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="bg-gray-700 p-4 rounded-lg break-all">
                  <h2 className="text-sm text-gray-400 mb-1">Public Key</h2>
                  <p className="font-mono text-gray-200">{publicKey.toString()}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-sm text-gray-400 mb-1">Balance</h2>
                  {balance !== null ? (
                    <p className="text-2xl text-gray-200 font-bold">
                      {balance.toFixed(4)} SOL
                    </p>
                  ) : (
                    <Skeleton className="h-8 w-24 bg-gray-600" />
                  )}
                </div>
                <Button
                  onClick={getAirdropOnClick}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Request Airdrop
                </Button>
              </motion.div>
            ) : (
              // Show this message if wallet is not connected
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  Connect your wallet to get started
                </p>
              </div>
            )}
          </CardContent>

        </Card>
      </main>

      {/* gradient line on bottom of the page */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
    </div>
  );
}