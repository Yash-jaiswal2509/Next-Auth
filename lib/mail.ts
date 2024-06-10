import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_API_URL;
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onborading@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<a href="${resetLink}">Click here to reset your password</a>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onborading@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<a href="${confirmLink}">Click here to verify your email</a>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onborading@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your Two Facotr Code: ${token}</p>`,
  });
};
