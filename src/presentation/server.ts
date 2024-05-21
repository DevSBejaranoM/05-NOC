import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server started...");

    // Mandar email
  //  new SendEmailLogs(
  //   emailService,
  //   fileSystemLogRepository
  //  ).execute([
  //   "sbejaranomartin@gmail.com"
  //  ])
    
    // emailService.sendEmail({
    //   to: "sbejaranomartin@gmail.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //   <h3>Logs de sistema - NOC</h3>
    //   <p>Se adjunta los logs de sistema</p>
    //   <p>Ver logs adjuntos</p>
    //   `,
    // });
    // emailService.sendEmailWithFilySistymeLogs(["sbejaranomartin@gmail.com"])

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   // const url = "http://localhost:3000";

    //   new CheckService(fileSystemLogRepository, undefined, undefined).execute(
    //     url
    //   );
    // });
  }
}
