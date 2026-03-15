import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [ ['html'],
              ['allure-playwright']
            ],
  use: {
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'on-first-failure',
    video: 'on',
    baseURL: 'https://www.saucedemo.com/',
  },

  metadata: {
    appUsername: 'pwtest@nal.com',
    appPassword: 'test123'
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { 
        channel: 'chrome',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
          ignoreDefaultArgs: ['--window-size=1280, 720']
        }
      },
    },
  ],
});