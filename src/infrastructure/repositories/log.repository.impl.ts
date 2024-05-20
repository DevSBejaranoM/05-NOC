import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogRepository } from "../../domain/repository/log.respository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entitiy";

export class LogRepositoryImpl extends LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {
    super();
    this.logDataSource = logDataSource;
  }

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
