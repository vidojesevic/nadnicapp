import assert from 'assert';
import { promises as fs } from 'node:fs';


import { getDotEnvData } from "../../config/db.config.js";

describe("getDotEnvData", () => {
    it("Should return data value from an existing key", async () => {
        fs.writeFile('.env', 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("KEY1");
        assert.strictEqual(result, 'value1');
    });

    it("Should return an empty string for non-existing key", async () => {
        fs.writeFile('.env', 'KEY1=value1\nKey2:value2');

        const result = await getDotEnvData("KEY3");
        assert.strictEqual(result, '');
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
