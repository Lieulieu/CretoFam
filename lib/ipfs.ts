import axios from "axios";

const PINATA_GATEWAY = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const PINATA_PIN_JSON = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

export async function uploadToPinata(
  fileOrBlob: File | Blob,
  mimeType?: string,
): Promise<string> {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) throw new Error("PINATA_JWT not set");

  if (mimeType === "application/json") {
    const text = await (fileOrBlob as Blob).text();
    const json = JSON.parse(text);
    const res = await axios.post(
      PINATA_PIN_JSON,
      json,
      { headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" } },
    );
    return res.data.IpfsHash;
  }

  const form = new FormData();
  form.append("file", fileOrBlob);
  const res = await axios.post(PINATA_GATEWAY, form, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data.IpfsHash;
}

