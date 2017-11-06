import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer, interfaces, TYPE } from 'inversify-express-utils';
import { LearningController } from './controllers/learning-controller';
import { S3FileProvider } from './providers/s3-file-provider';
import { logger } from './logger';
export function startServer(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            let container = new Container();
            container.bind<interfaces.Controller>(TYPE.Controller).to(LearningController).whenTargetNamed('LearningController');
            container.bind<S3FileProvider>('S3FileProvider').to(S3FileProvider);
            container.bind('Logger').toConstantValue(logger);
            let server = new InversifyExpressServer(container);
            
            server.setConfig((app) => {
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(bodyParser.json());
            });
            server.setErrorConfig((app) => {
                // add middleware to send message back since inversify sends back stack trace
                app.use((err, req, res, next) => {
                    if (err) {
                        if (err.name === 'UnauthorizedError') {
                            res.status(401).send(err.message);
                            return;
                        }
                        logger.error(`Unhandled exception`);
                        res.status(500).send(err.message);
                        return;
                    } else {
                        next();
                    }
                });
            });
            let svr = server.build();
            svr.listen(8200, () => {
                logger.info(`Listening on port 8200`);
            });
            resolve(true);
        } catch (err) {
            logger.error(`Failed to start server ${err}`);
            reject(err);
        }
    })
};
