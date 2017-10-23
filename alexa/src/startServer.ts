import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer, interfaces, TYPE } from 'inversify-express-utils';
import { LearningController } from './controllers/learning-controller';
export function startServer(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            let container = new Container();
            container.bind<interfaces.Controller>(TYPE.Controller).to(LearningController).whenTargetNamed('LearningController');
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
                        console.log(`Unhandled exception`);
                        res.status(500).send(err.message);
                        return;
                    } else {
                        next();
                    }
                });
            });
            let svr = server.build();
            svr.listen(process.env.LISTEN_PORT, () => {
                console.log(`Listening on port ${process.env.LISTEN_PORT}`);
            });
            resolve(true);
        } catch (err) {
            console.log(`Failed to start server ${err}`);
            reject(err);
        }
    })
};
