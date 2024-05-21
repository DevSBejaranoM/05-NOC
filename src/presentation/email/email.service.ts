import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  sendEmailWithFilySistymeLogs(to: string | string[]){
    const subject = "Logs del servidor";
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      <p>Se adjunta los logs de sistema</p>
      <p>Ver logs adjuntos</p>
    `;

    const attachments: Attachment[] = [
      { filename: "all-logs.log", path: "./logs/all-logs.log" },
      { filename: "high-logs.log", path: "./logs/high-logs.log" },
      { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
