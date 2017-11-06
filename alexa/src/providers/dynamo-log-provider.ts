import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import { LogEntry } from '../model/log-entry';
import { LogLevel } from '../model/log-level';
import * as uuidv4 from 'uuid/v4';
AWS.config.update({region: 'us-west-2'});
const dynamoDb = new AWS.DynamoDB()

@injectable()
export class DynamoLogProvider {
    debug(message: string){
       this.logMessage(message, LogLevel.DEBUG);
    }
    error(message: string){
        this.logMessage(message, LogLevel.ERROR);
    }
    info(message: string){
        this.logMessage(message, LogLevel.INFO);
    }

    logMessage(message: string, level: LogLevel){
        const entry = new LogEntry();
        entry.message = message;
        entry.level = level;
        entry.date = new Date();
        this.log(entry);
    }

    createLogTable() {
        const params = {
            TableName : "logs",
            KeySchema: [       
                { AttributeName: "id", KeyType: "HASH"},  //Partition key
                { AttributeName: "date", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [       
                { AttributeName: "id", AttributeType: "S" },
                { AttributeName: "date", AttributeType: "S" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5
            }
        };

        dynamoDb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    }


    log(logEntry: LogEntry) {
        console.log(logEntry.message);
        logEntry.id =  uuidv4();
        let dynamoParams: any = {};
        dynamoParams.TableName = 'logs';
        dynamoParams.Item = {
           "id": { S: logEntry.id },
           "date": {S: logEntry.date.toISOString() },
           "message": { S: logEntry.message},
           "level": { S: logEntry.level },
           "data": { S: JSON.stringify(logEntry.data || {} ) }

        }
        try {
            dynamoDb.putItem(dynamoParams, (err,data) =>{
                if (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    getLogs(): Promise<AWS.DynamoDB.ScanOutput> {
        return new Promise<any>((resolve, reject) => {
            const params = {
                TableName: 'logs'
            }
            dynamoDb.scan(params, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })

    }
}