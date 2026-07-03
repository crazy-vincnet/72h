import { insforge } from "@/lib/insforge";

export type RegistrationPayload = {
  name: string;
  email: string;
  phone: string | null;
  participants: number;
  days: string[];
  message: string | null;
};

/**
 * Best-effort registration emails via InsForge Email.
 *
 * NOTE: InsForge custom email requires a PAID plan. On the free tier the send
 * is rejected and this function just logs — it NEVER throws, so a failed email
 * can't break a registration. Set ORGANIZER_EMAIL to also notify the organizer.
 * The registrant confirmation always attempts to send.
 */
export async function sendRegistrationEmails(reg: RegistrationPayload) {
  const organizer = process.env.ORGANIZER_EMAIL?.trim();

  const confirmationHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#191c1d">
      <div style="background:#b02f00;color:#fff;padding:24px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;font-size:20px">Flame Worship · 72시간 기도</h1>
      </div>
      <div style="border:1px solid #e4beb4;border-top:none;padding:24px;border-radius:0 0 12px 12px">
        <p>${escapeHtml(reg.name)}님, 등록해 주셔서 감사합니다. 🙏</p>
        <p>북한을 위한 72시간 연속 기도에 함께해 주셔서 감사합니다.
        행사 날짜와 장소가 확정되는 대로 안내해 드리겠습니다.</p>
        <p style="color:#5b4039;font-size:14px">참여 인원: ${reg.participants}명${
          reg.days.length ? ` · 참여일: ${reg.days.join(", ")}` : ""
        }</p>
        <hr style="border:none;border-top:1px solid #e4beb4;margin:20px 0">
        <p style="color:#5b4039;font-size:13px">Thank you for registering for the 72 Hours of Prayer in Jeju.
        We'll be in touch once the dates and venue are confirmed.</p>
      </div>
    </div>`;

  // 1) Confirmation to the registrant.
  await safeSend({
    to: reg.email,
    subject: "[Flame Worship] 72시간 기도 등록이 접수되었습니다",
    html: confirmationHtml,
    from: "Flame Worship",
    replyTo: organizer,
  });

  // 2) Notification to the organizer (only if configured).
  if (organizer) {
    const notifyHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#191c1d">
        <h2 style="color:#b02f00">새 등록 / New registration</h2>
        <table style="border-collapse:collapse;font-size:14px">
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039">이름</td><td>${escapeHtml(reg.name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039">이메일</td><td>${escapeHtml(reg.email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039">전화</td><td>${escapeHtml(reg.phone ?? "-")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039">인원</td><td>${reg.participants}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039">참여일</td><td>${escapeHtml(reg.days.join(", ") || "-")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#5b4039;vertical-align:top">메시지</td><td>${escapeHtml(reg.message ?? "-")}</td></tr>
        </table>
      </div>`;
    await safeSend({
      to: organizer,
      subject: `[등록] 새 등록 — ${reg.name}`,
      html: notifyHtml,
      from: "Flame Worship",
      replyTo: reg.email,
    });
  }
}

async function safeSend(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) {
  try {
    const { error } = await insforge.emails.send(opts);
    if (error) {
      console.warn("[email] send skipped:", error.message);
    }
  } catch (err) {
    console.warn("[email] send threw (non-fatal):", err);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
