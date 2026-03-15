import { test, expect, Page } from '@playwright/test';

test('Verify all links on a webpage', async ({ page, request }) => {

    test.setTimeout(120000);

   /*  const request = await playwright.request.newContext({
        ignoreHTTPSErrors: true
    }); */

    await page.goto('https://www.w3schools.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
   
    const links = await page.$$eval('a', (elements) => {
        return elements
            .map((a) => a.href)
            .filter((href) => href && href.startsWith('http'));
    });
    console.log(`Total valid links found: ${links.length}`)
    const brokenLinks: string[] = [];
    await Promise.all(
        links.map(async (url) => {
            try {
                const response = await request.get(url);
                const status = response.status();
                console.log(`${status} ---> ${url}`);
                if (status === 404 || status === 500) {
                    brokenLinks.push(`${status} ---> ${url}`);
                }
            } catch (err) {
                brokenLinks.push(`ERROR ---> ${url}`);
            }
        })
);
    console.log(`\Broken links: ${brokenLinks.length}`);
     console.log(`\Broken links: ${brokenLinks}`);
});