import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onborading@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<a href="${resetLink}">Click here to reset your password</a>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`;

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
