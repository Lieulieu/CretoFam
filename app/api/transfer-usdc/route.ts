import { NextResponse } from "next/server";
import { encodeFunctionData } from "viem";

const TIPPING_ADDRESS = process.env.TIPPING_ADDRESS as `0x${string}` | undefined;

function toUSDC(amount: number): bigint {
  return BigInt(Math.round(amount * 1_000_000));
}

const TRANSFER_ABI = [
  {
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferUSDC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function POST(request: Request) {
  try {
    if (!TIPPING_ADDRESS) throw new Error("TIPPING_ADDRESS not set");
    
    const { from, to, amount } = await request.json();
    if (!from || !to || !amount) {
      return NextResponse.json({ error: "Missing from, to, or amount" }, { status: 400 });
    }

    const amountWei = toUSDC(Number(amount));

    const callData = encodeFunctionData({
      abi: TRANSFER_ABI,
      functionName: "transferUSDC",
      args: [from as `0x${string}`, to as `0x${string}`, amountWei],
    });

    const call = {
      to: TIPPING_ADDRESS,
      data: callData,
      value: 0n,
    };

    return NextResponse.json({ call });
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Transfer failed";
    return NextResponse.json({ error }, { status: 500 });
  }
}
