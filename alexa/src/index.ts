import 'reflect-metadata';
import { startServer } from './startServer';
import { logger } from './logger';

startServer().catch(err => {
    logger.error(`SERVER CRASH: ${err}`);
    process.exit(1);
});
