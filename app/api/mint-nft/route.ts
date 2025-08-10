import { NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

const NFT_ADDRESS = process.env.NFT_ADDRESS as `0x${string}` | undefined;

const NFT_ABI = [
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "metadataURI", type: "string" },
    ],
    name: "mintNFT",
    outputs: [{ name: "tokenId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!NFT_ADDRESS) throw new Error("NFT_ADDRESS not set");
    const { recipient, metadataUri } = await request.json();
    if (!recipient || !metadataUri) return NextResponse.json({ error: "missing" }, { status: 400 });

    const dataHex = encodeFunctionData({
      abi: NFT_ABI,
      functionName: "mintNFT",
      args: [recipient as `0x${string}`, metadataUri as string],
    });
    const call = { to: NFT_ADDRESS, data: dataHex, value: 0n };
    return NextResponse.json({ call });
  } catch (e) {
    const message = e instanceof Error ? e.message : "mint failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

