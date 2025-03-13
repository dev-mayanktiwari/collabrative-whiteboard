import { AppConfig } from "@/config";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: String(process.env.MAILGUN_API_KEY),
});

const MAILGUN_DOMAIN = String(AppConfig.get("MAILGUN_DOMAIN"));
const FROM_EMAIL = "SMARTDRAW <no-reply@support.mayanktiwari.tech>";
const FRONTEND_URL = String(AppConfig.get("FRONTEND_URL"));

export default {
  sendVerificationEmail: async (
    to: string,
    name: string,
    verificationToken: string,
    code: string
  ) => {
    try {
      const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}&code=${code}`;
      const data = await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: [`"${name.toUpperCase()}" <${to.toLowerCase()}>`],
        subject: "You're Almost There! Verify Your Email to Get Started 🎨",
        template: "Account Verification Email",
        "h:X-Mailgun-Variables": JSON.stringify({
          email_verification_link: verificationLink,
          name: name,
        }),
      });
      return { success: true, info: data };
    } catch (error) {
      return { success: false, info: error };
    }
  },
  sendWelcomeEmail: async (to: string, name: string) => {
    try {
      const data = await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: [`"${name.toUpperCase()}" <${to.toLowerCase()}>`],
        subject: "Welcome to SMARTDRAW 🎨",
        template: "Welcome Email",
        "h:X-Mailgun-Variables": JSON.stringify({
          name: name,
          frontend_url: FRONTEND_URL,
        }),
      });
      return { success: true, info: data };
    } catch (error) {
      return { success: false, info: error };
    }
  },

  sendPasswordResetLinkEmail: async (
    to: string,
    name: string,
    resetToken: string
  ) => {
    try {
      const resetPasswordLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
      const data = await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: [`"${name.toUpperCase()}" <${to.toLowerCase()}>`],
        subject: "Reset Your SMARTDRAW Password 🔑",
        template: "Reset Password Email",
        "h:X-Mailgun-Variables": JSON.stringify({
          reset_password_link: resetPasswordLink,
          name: name,
        }),
      });
      return { success: true, info: data };
    } catch (error) {
      return { success: false, info: error };
    }
  },

  sendPasswordChangeSuccessEmail: async (to: string, name: string) => {
    try {
      const data = await mg.messages.create(MAILGUN_DOMAIN, {
        from: FROM_EMAIL,
        to: [`"${name.toUpperCase()}" <${to.toLowerCase()}>`],
        subject: "Your SMARTDRAW Password Has Been Changed 🔑",
        template: "password-changed-successful",
        "h:X-Mailgun-Variables": JSON.stringify({
          name: name,
        }),
      });
      return { success: true, info: data };
    } catch (error) {
      return { success: false, info: error };
    }
  },
};
