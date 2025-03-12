import { AppConfig } from "@/config";
import FormData from "form-data";
import Mailgun from "mailgun.js";

async function SendEmail(email: string, name: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: String(process.env.MAILGUN_API_KEY),
  });

  try {
    const data = await mg.messages.create(
      String(AppConfig.get("MAILGUN_DOMAIN")),
      {
        from: "SMARTDRAW <no-reply@support.mayanktiwari.tech>",
        to: [`${name.toUpperCase()} <${email.toLowerCase()}>`],
        subject: "Hello Mayank Tiwari",
        text: "Congratulations Mayank Tiwari, you just sent an email with Mailgun! You are truly awesome!",
      }
    );

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

export default SendEmail;
