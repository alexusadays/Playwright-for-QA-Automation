import {test, expect} from '@playwright/test'

test("Learning selectors", async ({page}) => {
  // navigate to the webpage
  await page.goto('http://127.0.0.1:5501/clickMe.html')

  // 1 Selecting by ID
  await page.locator('#clickButton').click()

  // 2 Selecting by Class
  await page.locator('.button-style').click()

  // 3 By Tag and Class
  await page.locator('button.button-style').click()

  // 4 By Attribute Value
  await page.locator('[data-action="increment"]').click()

  // 5 Partial attribute
  await page.locator('[role*="but"]').click()

  // 6 By text content
  await page.locator('text=CLICK ME').click()

  // 7 Combine selectors for precision, class and text - find exact text match
  await page.locator('.button-style:text("CLICK ME")').click()

  // 8 Find elements containing specific text, has-text
  await page.locator('button:has-text("click me")').click()

  // 9 Attribute and text combination
  await page.locator('[data-action="increment"]:text("CLICK ME")').click()

  // 10 playwright locators https://playwright.dev/docs/locators
  // get by text
  await page.getByText('CLICK ME').click()

  // 11 by role 
  await page.getByRole('button', { name: /click me/i }).click();
 
  // assert the counter
  await expect(page.locator('#counter')).toContainText('11')
})