import { LogSeverityLevel } from "../domain/entities/log.entitiy";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgre-log.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {
  static async start() {
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

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      // const url = "http://localhost:3000";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        undefined,
        undefined
      ).execute(url);

      // new CheckService(logRepository, undefined, undefined).execute(
      //   url
      // );
    });
  }
}
