"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import Feed from "./components/Feed";
import PostForm from "./components/PostForm";
import NFTMint from "./components/NFTMint";
import TransferUSDC from "./components/TransferUSDC";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const { address } = useAccount();

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4 text-sm"
        >
          + Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">Saved</div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3 h-11">
          <div>
            <div className="flex items-center space-x-2">
              <Wallet className="z-10">
                <ConnectWallet>
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        {/* Banner Image */}
        <div className="mb-6">
          <div className="relative w-full h-32 rounded-xl overflow-hidden">
            <Image
              src="/cretofam.png"
              alt="CretoFam Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <h1 className="text-2xl font-bold">CretoFam</h1>
              <p className="text-sm opacity-90">Decentralized Social Media on Base</p>
            </div>
          </div>
        </div>

        {/* Mission Description - Similar to ImpactCent */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Make an Impact with Micro-Tips
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Support creators with tips as little as $0.01, powered by Base&apos;s low-fee infrastructure. 
            Every tip counts in building a decentralized creator economy.
          </p>
        </div>

        <main className="flex-1">
          <div className="space-y-4">
            <PostForm onPosted={() => {}} />
            <Feed />
            {address && (
              <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-4">
                <h3 className="mb-2">Mint Fan Pass</h3>
                <NFTMint recipient={address as `0x${string}`} />
              </div>
            )}
            {address && (
              <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-4">
                <h3 className="mb-2">Transfer USDC</h3>
                <TransferUSDC />
              </div>
            )}
          </div>
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <button
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
