import "reflect-metadata";
import { DataSource } from "typeorm";

const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

async function getSecretValue(secretName: string) {
    const client = new AWS.SecretsManager();
    try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        return JSON.parse(data.SecretString);
    } catch (err) {
        console.error('Error retrieving secret:', err);
        throw err;
    }
};

export async function AppDataSource() {
    const secretName = 'learn-it-right-way';
    const credentials = await getSecretValue(secretName);

    const appDataSource = new DataSource({
        type: "mysql",
        host: credentials.host,
        port: 3306,
        username: credentials.username,
        password: credentials.password,
        database: credentials.database,
        synchronize: true,
        logging: false,
        entities: ["src/entity/*.ts"],
        migrations: [],
        subscribers: [],
    });

    return appDataSource;
}

