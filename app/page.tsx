"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6">Welcome to Solana Wallet Interface</h1>
        <p className="text-xl text-gray-400 mb-8">
          Connect your wallet, check your balance, and request airdrops with ease.
        </p>

        <Link href="/overview">
          <Button className="bg-purple-600 hover:bg-purple-700 transition-colors text-lg px-8 py-3">
            Overview
          </Button>
        </Link>

        <br/>
        <br/>

        <Link href="/wallet">
          <Button className="bg-purple-600 hover:bg-purple-700 transition-colors text-lg px-8 py-3">
            Get Started
          </Button>
        </Link>

      </motion.div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
    </div>
  );
}

