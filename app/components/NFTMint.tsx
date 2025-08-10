"use client";
import { useState } from "react";
import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";

type PreparedCall = { to: `0x${string}`; data: `0x${string}`; value: bigint };

export default function NFTMint({ recipient }: { recipient: `0x${string}` }) {
  const [metadataUri, setMetadataUri] = useState("");
  const [call, setCall] = useState<PreparedCall | null>(null);

  async function handlePrepare() {
    const res = await fetch("/api/mint-nft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, metadataUri }),
    });
    const json = await res.json();
    if (res.ok) setCall(json.call);
  }

  return (
    <div className="space-y-2">
      <input
        value={metadataUri}
        onChange={(e) => setMetadataUri(e.target.value)}
        placeholder="ipfs://..."
        className="w-full bg-transparent border px-2 py-1 rounded"
      />
      {!call ? (
        <button onClick={handlePrepare} className="px-3 py-1 rounded bg-[var(--app-accent)] text-white">Prepare Mint</button>
      ) : (
        <Transaction calls={[call]}>
          <TransactionButton className="px-3 py-1 rounded bg-[var(--app-accent)] text-white" />
          <TransactionStatus>
            <TransactionStatusLabel />
          </TransactionStatus>
        </Transaction>
      )}
    </div>
  );
}

