import { LogLevel } from './log-level';
export class LogEntry {
    id: string;
    logDate :Date;
    message: string;
    data: any;
    level: LogLevel;
}