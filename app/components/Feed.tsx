"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TipButton from "./TipButton";

type Post = { 
  id: string; 
  text: string; 
  creator: string; 
  image?: string | null;
  tipCount?: number;
  totalTips?: number;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/trending");
      const json = await res.json();
      setPosts(json.posts || []);
    })();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((p) => (
        <div key={p.id} className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-4">
          {/* Creator Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm opacity-70 font-medium">{p.creator}</div>
            <div className="text-xs text-gray-500">
              {p.tipCount ? `${p.tipCount} tips` : 'No tips yet'}
            </div>
          </div>
          
          {/* Post Content */}
          <div className="mb-3">
            <div className="text-gray-800 mb-2">{p.text}</div>
            {p.image && (
              <div className="rounded-lg overflow-hidden">
                <Image src={p.image} alt="post" width={800} height={600} className="w-full h-auto" />
              </div>
            )}
          </div>
          
          {/* Tip Stats */}
          {p.totalTips && p.totalTips > 0 && (
            <div className="mb-3 p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700 font-medium">
                💰 Total Tips: ${p.totalTips.toFixed(2)} USDC
              </div>
            </div>
          )}
          
          {/* Tip Button Section */}
          <div className="border-t pt-3">
            <TipButton creator={p.creator as `0x${string}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

