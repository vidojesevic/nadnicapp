import assert from 'assert';
import { promises as fs } from 'node:fs';
import path from 'path';

import { getDotEnvData } from "../../config/db.config.js";

describe("getDotEnvData", () => {
    async function createEnvFile() {
        const envPath = path.resolve(__dirname, '.env');
        await fs.writeFile(envPath, 'KEY1=value1\nKEY2=value2');
        return envPath;
    }

    it("Should return data value from an existing key", async () => {
        const envFilePath = await createEnvFile();
        fs.writeFile(envFilePath, 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("KEY1");
        assert.strictEqual(result, 'value1');
        await fs.unlink(envFilePath)
    });

    it("Should return an empty string for non-existing key", async () => {
        const envFilePath = await createEnvFile();
        fs.writeFile(envFilePath, 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("KEY3");
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
