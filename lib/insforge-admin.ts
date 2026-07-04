import { createAdminClient } from "@insforge/sdk";

/**
 * Privileged admin client for server-side use only.
 * Bypasses RLS to read/write registrations, settings, and schedule_sessions.
 */
export const insforgeAdmin = createAdminClient({
  baseUrl: process.env.INSFORGE_URL || "https://7zh8h5k3.us-east.insforge.app",
  apiKey: process.env.INSFORGE_ADMIN_KEY || "placeholder",
});
