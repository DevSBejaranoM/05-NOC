export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createdAt?: Date;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { message, level, origin, createdAt } = JSON.parse(json);
    if (!message || !level || !origin || !createdAt) {
      throw new Error("Invalid JSON");
    }
    const log = new LogEntity({ message, level, origin, createdAt });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, origin, createdAt } = object;
    if (!message || !level || !origin || !createdAt) {
      throw new Error("Invalid Object");
    }
    const log = new LogEntity({ message, level, origin, createdAt });
    return log;
  };
}
