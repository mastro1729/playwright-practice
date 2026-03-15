import { test as base, expect } from '@playwright/test';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { parse } from "csv-parse/sync";

type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsLetter: string
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../testdata/register.csv");
type csvFixture = { regData: RegData[] }

const dataTest = base.extend<csvFixture>({
    regData: async ({ }, use) => {
        const raw = fs.readFileSync(filePath, "utf-8");
        const records: RegData[] = parse(raw, {
            columns: true,
            skip_empty_lines: true
        })
        await use(records);
    }
})
export{dataTest, expect};