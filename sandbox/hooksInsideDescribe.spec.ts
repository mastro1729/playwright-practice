import {test, expect} from '@playwright/test';

test.describe('Hooks Inside Describe', () => {

    test.beforeAll(async () => {
    console.log("Before All");
})

test.beforeEach(async () => {
    console.log("Before Each");
})

test.afterAll(async () => {
    console.log("After All");
})

test.afterEach(async () => {
    console.log("After Each");
})

test('Login Page', async () => {
    console.log("Login");
})

test('Home Page', async () => {
    console.log("Home");
})

test('Logout Page', async () => {
    console.log("Logout");
})

})