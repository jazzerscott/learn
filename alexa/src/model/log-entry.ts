import { LogLevel } from './log-level';
export class LogEntry {
    id: string;
    date: Date;
    message: string;
    data: any;
    level: LogLevel;
}