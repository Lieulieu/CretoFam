"use client";
import { useState } from "react";
import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";

export default function TipButton({ creator }: { creator: `0x${string}` }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  type PreparedCall = { to: `0x${string}`; data: `0x${string}`; value: bigint };
  const [call, setCall] = useState<PreparedCall | null>(null);

  const tipAmounts = [0.01, 0.05, 0.10]; // Similar to ImpactCent's micro-donation amounts

  async function prepareCall(amount: number) {
    setSelectedAmount(amount);
    const res = await fetch("/api/tip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator, amount }),
    });
    const json = await res.json();
    if (res.ok) setCall(json.call);
  }

  return (
    <div className="space-y-3">
      {/* Quick Tip Section - Similar to ImpactCent's Quick Donation */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Tip</h4>
        <div className="flex gap-2">
          {tipAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => prepareCall(amount)}
              disabled={selectedAmount === amount && call !== null}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedAmount === amount && call !== null
                  ? "bg-[var(--app-accent)] text-white shadow-md"
                  : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>
      
      {/* Transaction Section */}
      {call && (
        <div className="bg-[var(--app-accent)] rounded-lg p-3">
          <div className="text-center mb-3">
            <div className="text-white text-sm font-medium mb-1">
              Tip {selectedAmount} USDC to Creator
            </div>
            <div className="text-white/80 text-xs">
              Powered by Base&apos;s low-fee infrastructure
            </div>
          </div>
          
          <Transaction calls={[call]}>
            <TransactionButton className="w-full px-4 py-2 rounded-lg bg-white text-[var(--app-accent)] font-medium hover:bg-gray-50 transition-colors" />
            <TransactionStatus>
              <TransactionStatusLabel />
            </TransactionStatus>
          </Transaction>
        </div>
      )}
    </div>
  );
}

