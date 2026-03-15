import {test, expect} from '@playwright/test';

test('should add, verify, and complete a todo item', async ({page}) => {
    // 1. Open the TodoMVC app
    await page.goto('https://demo.playwright.dev/todomvc');

    // 2. Add a new todo
    let newTodo = 'Buy Milk';
    await page.fill('input.new-todo', newTodo);
    await page.keyboard.press('Enter');

    // 3. Verify that the new todo appears in the list
    let todoItem = page.locator('ul.todo-list li', {hasText: newTodo});
    await expect(todoItem).toBeVisible();
    await page.waitForTimeout(5000);

    // 4. Verify the counter shows 1 item left
    //span[@class='todo-count'][normalize-space(.)='1 item left']
    let count = page.locator('span.todo-count');
    await expect(count).toHaveText('1 item left');
    await page.waitForTimeout(5000);

    // 5. Mark the todo as completed
    await todoItem.locator('input.toggle').check();
    await page.waitForTimeout(5000);

    // 6. Verify that the counter updates to 0 items left
    await expect(count).toHaveText('0 items left');

    // 7. Verify that completed item has 'completed' class
    await expect(todoItem).toHaveClass(/completed/);
})