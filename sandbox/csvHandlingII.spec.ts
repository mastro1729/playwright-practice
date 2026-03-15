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
    
    const records: TestExecutionRow[] = parse(content, {
        delimiter: "|",
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    const failedRows: TestExecutionRow[] = records.filter(
        row => row.Status === "Fail"
    )
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