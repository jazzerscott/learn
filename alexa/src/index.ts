import 'reflect-metadata';
import { startServer } from './startServer';
startServer().catch(err => {
    console.log(`SERVER CRASH: ${err}`);
    process.exit(1);
});
