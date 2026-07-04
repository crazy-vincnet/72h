import crypto from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET || "default_fallback_secret_for_dev_only";

export function comparePasswords(input: string, actual: string): boolean {
  const inputHash = crypto.createHash("sha256").update(input).digest();
  const actualHash = crypto.createHash("sha256").update(actual).digest();
  return crypto.timingSafeEqual(inputHash, actualHash);
}

export function signSession(expires: number): string {
  const payload = JSON.stringify({ user: "admin", expires });
  const base64Payload = Buffer.from(payload).toString("base64");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(base64Payload)
    .digest("hex");
  return `${base64Payload}.${signature}`;
}

export function verifySession(cookieValue: string): boolean {
  if (!cookieValue) return false;
  const parts = cookieValue.split(".");
  if (parts.length !== 2) return false;
  const [base64Payload, signature] = parts;
  
  try {
    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(base64Payload)
      .digest("hex");
      
    // Compare signatures timing-safely
    const sigBuffer = Buffer.from(signature, "hex");
    const expBuffer = Buffer.from(expectedSignature, "hex");
    
    if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
      return false;
    }
    
    const payloadStr = Buffer.from(base64Payload, "base64").toString("utf8");
    const payload = JSON.parse(payloadStr);
    
    if (!payload.expires || payload.expires < Date.now()) {
      return false;
    }
    
    return payload.user === "admin";
  } catch {
    return false;
  }
}
