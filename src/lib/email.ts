// Alibaba Cloud DirectMail SMTP sender
// Works in Node.js (dev) and Cloudflare Workers (prod) via runtime detection
import { Buffer } from "node:buffer";

const SMTP_HOST = process.env.SMTP_HOST || "smtpdm.aliyun.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || "";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SmtpSocket {
  write(data: string): void;
  on(event: string, cb: (...args: any[]) => void): void;
  once(event: string, cb: (...args: any[]) => void): void;
  removeAllListeners(): void;
  end(): void;
  destroy(): void;
}

// ─── Runtime detection ────────────────────────────────────────────

function isNode(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}

async function createTlsSocket(
  host: string,
  port: number,
): Promise<SmtpSocket> {
  if (isNode()) {
    // Node.js: use tls module
    const tls = await import("tls");
    return tls.connect({
      host,
      port,
      rejectUnauthorized: false,
      servername: host,
    }) as unknown as SmtpSocket;
  }
  // Cloudflare Workers: use connect() API
  // @ts-expect-error Cloudflare Workers global
  return connect(
    { hostname: host, port },
    { secureTransport: "on" },
  ) as unknown as SmtpSocket;
}

// ─── SMTP protocol helpers ────────────────────────────────────────

function readLine(socket: SmtpSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    const onData = (chunk: Buffer | string) => {
      data += chunk.toString();
      if (data.includes("\n")) {
        socket.removeAllListeners();
        resolve(data);
      }
    };
    const onError = (err: Error) => {
      socket.removeAllListeners();
      reject(err);
    };
    const onClose = () => {
      socket.removeAllListeners();
      if (data) resolve(data);
      else reject(new Error("Socket closed"));
    };
    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);
  });
}

async function smtpCommand(
  socket: SmtpSocket,
  cmd: string,
  expectCode = 250,
): Promise<string> {
  socket.write(cmd + "\r\n");
  const response = await readLine(socket);
  const code = parseInt(response.substring(0, 3), 10);
  if (code < 200 || code >= 400) {
    throw new Error(`SMTP error [${cmd}]: ${response.trim()}`);
  }
  return response;
}

function base64(str: string): string {
  if (isNode()) {
    return Buffer.from(str).toString("base64");
  }
  return btoa(str);
}

function buildMimeMessage(
  from: string,
  to: string,
  subject: string,
  html: string,
  text?: string,
): string {
  const boundary = `==BOUNDARY_${Date.now()}_${Math.random().toString(36).slice(2)}==`;
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
  ];

  const bodyParts = [`--${boundary}`];
  if (text) {
    bodyParts.push(
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(text),
      "",
    );
  }
  bodyParts.push(
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(html),
    "",
  );
  bodyParts.push(`--${boundary}--`);

  return headers.join("\r\n") + "\r\n" + bodyParts.join("\r\n");
}

function wrapBase64(str: string): string {
  const b64 = Buffer.from(str, "utf-8").toString("base64");
  const lines: string[] = [];
  for (let i = 0; i < b64.length; i += 76) {
    lines.push(b64.slice(i, i + 76));
  }
  return lines.join("\r\n");
}

// ─── Public API ───────────────────────────────────────────────────

export async function sendEmail(
  options: EmailOptions,
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  let socket: SmtpSocket | null = null;

  try {
    // 1. Connect + TLS
    socket = await createTlsSocket(SMTP_HOST, SMTP_PORT);

    // 2. Read greeting
    await readLine(socket);

    // 3. EHLO
    await smtpCommand(socket, "EHLO eshop-imgai.org");

    // 4. AUTH LOGIN
    await smtpCommand(socket, "AUTH LOGIN", 334);
    await smtpCommand(socket, base64(SMTP_USER), 334);
    await smtpCommand(socket, base64(SMTP_PASS), 235);

    // 5. MAIL FROM
    await smtpCommand(socket, `MAIL FROM:<${SMTP_FROM}>`);

    // 6. RCPT TO
    await smtpCommand(socket, `RCPT TO:<${options.to}>`);

    // 7. DATA
    await smtpCommand(socket, "DATA", 354);
    const message = buildMimeMessage(
      SMTP_FROM,
      options.to,
      options.subject,
      options.html,
      options.text,
    );
    const dataResponse = await smtpCommand(socket, message + "\r\n.");

    // Extract message ID
    const idMatch = dataResponse.match(/message-id[=:]\s*<?([^\s>]+)/i);
    const messageId = idMatch ? idMatch[1] : undefined;

    // 8. QUIT
    socket.write("QUIT\r\n");
    socket.end();

    return { success: true, messageId };
  } catch (err: any) {
    if (socket) {
      try {
        socket.destroy();
      } catch (_) {}
    }
    return { success: false, error: err.message || String(err) };
  }
}

// ─── Convenience: send verification code ──────────────────────────

export function sendVerificationCode(to: string, code: string) {
  return sendEmail({
    to,
    subject: `Your verification code: ${code}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 16px">Verification Code</h2>
        <p style="color:#555;margin:0 0 24px">Use the code below to verify your email address.</p>
        <div style="background:#f5f5f5;padding:16px 24px;border-radius:8px;text-align:center">
          <span style="font-size:32px;font-weight:700;letter-spacing:6px;font-family:monospace">${code}</span>
        </div>
        <p style="color:#999;font-size:13px;margin:24px 0 0">This code expires in 10 minutes. If you didn't request this, please ignore.</p>
      </div>
    `,
    text: `Your verification code is: ${code}. It expires in 10 minutes.`,
  });
}
