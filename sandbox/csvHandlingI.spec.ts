import { test, expect } from '@playwright/test';

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parse } from 'csv-parse/sync'; //[npm install csv-parse]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TestExecutionRow {
    TestCase: string;
    Status: string;
    ExecutedBy: string;
    ExecutionDate: string
}

export function getFailedTestCases(csvFileName: string): TestExecutionRow[] {
    const filePath = path.join(__dirname, "../testdata", csvFileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n");
    const header = lines[0].split("|").map(column => column.trim());
    const statusIndex = header.indexOf("Status");
    if (statusIndex == -1) {
        throw new Error("Status column not found in CSV.")
    }
    const failedRows: TestExecutionRow[] = lines.slice(1)
        .map(row => row.split("|").map(value => value.trim()))
        .filter(row => row[statusIndex] === "Fail")
        .map(row => {
            const obj = {} as TestExecutionRow;
            header.forEach((key, index) => {
                obj[key as keyof TestExecutionRow] = row[index];
            });
            return obj;
        });

    return failedRows;
}

test('Validate failed test cases from CSV report', async () => {
    const failedTests = getFailedTestCases("executionReport.csv");
    for(const testCase of failedTests){
        expect(testCase.Status).toBe("Fail");
        console.log(`TestCase ${testCase.TestCase} failed, executed by ${testCase.ExecutedBy}`);
    }
    console.table(failedTests);
});