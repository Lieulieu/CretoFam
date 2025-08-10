"use client";
import { useState } from "react";
import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";

type PreparedCall = { to: `0x${string}`; data: `0x${string}`; value: bigint };

export default function TransferUSDC() {
  const [fromAddress, setFromAddress] = useState("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913");
  const [toAddress, setToAddress] = useState("0x783A891F1030Eb7930f82B01745fe455011C5b02");
  const [amount, setAmount] = useState(0.1);
  const [call, setCall] = useState<PreparedCall | null>(null);

  async function prepareTransfer() {
    const res = await fetch("/api/transfer-usdc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromAddress, to: toAddress, amount }),
    });
    const json = await res.json();
    if (res.ok) setCall(json.call);
  }

  return (
    <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Transfer USDC</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Address</label>
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Address</label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent"
            placeholder="0x..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USDC)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent"
          />
        </div>

        {!call ? (
          <button
            onClick={prepareTransfer}
            className="w-full px-4 py-2 bg-[var(--app-accent)] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Prepare Transfer
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700 font-medium">
                Transfer {amount} USDC from {fromAddress.slice(0, 6)}...{fromAddress.slice(-4)} to {toAddress.slice(0, 6)}...{toAddress.slice(-4)}
              </div>
            </div>
            
            <Transaction calls={[call]}>
              <div className="text-center mb-2 text-sm font-medium text-gray-700">
                Confirm Transfer {amount} USDC
              </div>
              <TransactionButton className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors" />
              <TransactionStatus>
                <TransactionStatusLabel />
              </TransactionStatus>
            </Transaction>
          </div>
        )}
      </div>
    </div>
  );
}
