import { NextResponse } from "next/server";
import { uploadToPinata } from "@/lib/ipfs";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const text = String(formData.get("text") || "");
    const image = formData.get("image") as File | null;
    if (!text && !image) return NextResponse.json({ error: "empty post" }, { status: 400 });

    const imageCid = image ? await uploadToPinata(image) : null;
    const metadata = {
      text,
      image: imageCid ? `ipfs://${imageCid}` : null,
      createdAt: Date.now(),
    };

    const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    const metadataCid = await uploadToPinata(blob, "application/json");

    return NextResponse.json({ metadataCid, metadataUri: `ipfs://${metadataCid}` });
  } catch (e) {
    const message = e instanceof Error ? e.message : "upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

