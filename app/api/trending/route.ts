import { NextResponse } from "next/server";

// Placeholder: in a full build, aggregate onchain events (tips, mints) and offchain engagement
// Here we return a static ranking keyed by timestamps; plug AgentKit here later

export async function GET() {
  const mock = [
    { 
      id: "1", 
      text: "Hello Base! Excited to share my journey in Web3 development.", 
      score: 0.92, 
      creator: "0x783A891F1030Eb7930f82B01745fe455011C5b02", 
      image: null,
      tipCount: 3,
      totalTips: 0.16
    },
    { 
      id: "2", 
      text: "Mint a fan pass to support me! Building the future of decentralized social media.", 
      score: 0.87, 
      creator: "0x783A891F1030Eb7930f82B01745fe455011C5b02", 
      image: null,
      tipCount: 1,
      totalTips: 0.05
    },
  ];
  return NextResponse.json({ posts: mock });
}

