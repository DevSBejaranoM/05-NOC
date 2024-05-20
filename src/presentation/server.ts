import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
        const url = "https://google.com";
        new CheckService(
            () => console.log(`Service ${url} is OK`),
            (error) => console.log(`Error on check service: ${error}`)
        ).execute(url);
    });
  }
}
