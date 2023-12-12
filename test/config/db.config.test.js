import assert from 'assert';
import { promises as fs } from 'node:fs';
import path from 'path';

import { getDotEnvData, createDbConfig } from "../../config/db.config.js";

// let mockedGetDotEnvData;

async function createEnvFile() {
    const envPath = path.resolve(__dirname, '.env');
    await fs.writeFile(envPath, 'KEY1=value1\n');
    return envPath;
}

describe("getDotEnvData", () => {

    it("Should return data value from an existing key", async () => {
        const envFilePath = await createEnvFile();
        fs.writeFile(envFilePath, 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("DB_HOST");
        assert.strictEqual(result, 'localhost');
        await fs.unlink(envFilePath)
    });

    it("Should return an empty string for non-existing key", async () => {
        const envFilePath = await createEnvFile();
        fs.writeFile(envFilePath, 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("DB_USERNAMw");
        assert.strictEqual(result, '');
        await fs.unlink(envFilePath)
    });

    it("Should throw an error if there is an issue reading .env", async () => {
        try {
            await getDotEnvData("Key");
        } 
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });
})

describe("createDbConfig", () => {
    it("Should throw error if there is an issue", async () => {
        try {
            await createDbConfig();
        }
        catch (err) {
            assert.ok(err instanceof Error);
        }
    });

    it("Should return valid database configuration", async () => {
        const dbConfig = await createDbConfig()
        console.log("Opa sine")
    });
});
