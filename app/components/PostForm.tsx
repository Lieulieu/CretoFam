"use client";
import { useState } from "react";

export default function PostForm({ onPosted }: { onPosted: (uri: string) => void }) {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("text", text);
      if (imageFile) fd.append("image", imageFile);
      const res = await fetch("/api/post", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "upload failed");
      onPosted(json.metadataUri);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share something..."
        className="w-full bg-transparent outline-none"
      />
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
      <button disabled={loading} onClick={handleCreate} className="px-3 py-2 rounded bg-[var(--app-accent)] text-white">
        {loading ? "Loading..." : "Post"}
      </button>
    </div>
  );
}

