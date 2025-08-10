import { NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

const TIPPING_ADDRESS = process.env.TIPPING_ADDRESS as `0x${string}` | undefined;

function toUSDC(amount: number): bigint {
  // Avoid floating point drift for common 2-decimal inputs
  return BigInt(Math.round(amount * 1_000_000));
}

const TIPPING_ABI = [
  {
    inputs: [
      { name: "creator", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "tipCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!TIPPING_ADDRESS) throw new Error("TIPPING_ADDRESS not set");
    const { creator, amount } = await request.json();
    if (!creator || !amount) return NextResponse.json({ error: "missing" }, { status: 400 });

    const amountWei = toUSDC(Number(amount));

    const dataHex = encodeFunctionData({
      abi: TIPPING_ABI,
      functionName: "tipCreator",
      args: [creator as `0x${string}`, amountWei],
    });
    const call = { to: TIPPING_ADDRESS, data: dataHex, value: 0n };
    return NextResponse.json({ call });
  } catch (e) {
    const message = e instanceof Error ? e.message : "tip failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

