import { createClient } from "@insforge/sdk";

/**
 * Server-side InsForge client using the anon key.
 *
 * The `registrations` table only grants INSERT to the `anon` role (RLS),
 * so this client can submit registrations but cannot read them back —
 * least privilege for a public form. Used from app/api/register.
 */
export const insforge = createClient({
  baseUrl: process.env.INSFORGE_URL!,
  anonKey: process.env.INSFORGE_ANON_KEY!,
});
