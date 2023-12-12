import {promises as fs} from "node:fs";

export async function getDotEnvData(data) {
    try {
        const content = await fs.readFile('.env', 'utf8');
        data = data + "="

        const line = content.split('\n');
        let result = '';

        line.forEach((val) => {
            if (val.includes(data)) {
                result = val.replace(data, "").trim();
            }
        });

        return result;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

export async function createDbConfig() {
    try {
        const hostPromise = getDotEnvData("DB_HOST");
        const userPromise = getDotEnvData("DB_USER");
        const passwordPromise = getDotEnvData("DB_PASS");
        const databasePromise = getDotEnvData("DB_NAME");
        const port = 3306;
        const connectionLimit = 10;

        const [host, user, password, database] = await Promise.all([
            hostPromise, userPromise, passwordPromise, databasePromise
        ]);

        return { host, user, password, port, database, connectionLimit};
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

const dbConfig = await createDbConfig();

export { dbConfig };
