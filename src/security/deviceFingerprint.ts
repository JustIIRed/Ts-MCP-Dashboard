import FingerprintJS, { type GetResult } from "@fingerprintjs/fingerprintjs";

export async function getFingerprint(): Promise<string> {
  try {
    const fp = await FingerprintJS.load();
    const result: GetResult = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error("Failed to generate fingerprint:", error);
    return "";
  }
}
