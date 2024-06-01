import { test, expect } from '@playwright/test';

test.describe.only("Learn assertions", () => {

    test('Verify web page behavior', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // 1. to have URL
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/')

        // 2. to have a title
        await expect(page).toHaveTitle('The Internet')
    })

    test('Continues with assertions', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // 3. assert visibility
        await expect(page.locator('h1')).toBeVisible()

        // 4. assert element to have text
        await expect(page.locator('h2')).toHaveText('Available Examples')

        // 5. assert contains text
        await expect(page.locator('body')).toContainText('WYSIWYG')
    })
    
    test('Continue with assertions part 2', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // 6. assert count
        await expect(page.locator('a')).toHaveCount(46)

        // 7 to be checked
        await page.goto('https://the-internet.herokuapp.com/checkboxes')
        await page.waitForTimeout(1000)
        await page.waitForLoadState('networkidle')
        let checkbox =  await page.getByRole('checkbox').nth(0)
        await checkbox.waitFor()
        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();
        await expect(page.getByRole('checkbox').nth(0)).toBeChecked()
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()


    })

    test('Continue with assertions part 3', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/login')

        // 8 have value

        await page.locator('#username').fill('tomsmith')
        await expect(page.locator('#username')).toHaveValue('tomsmith')

        // 9 element is enabled
        await expect(page.locator('button[type="submit"]')).toBeEnabled();
        // await expect(page.locator('button[type="submit"]')).toBeDisabled();
    })

    test('Continue with assertions part 4', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com')

        // 10 verify text store in variable
        const headerText = await page.locator('h1').textContent()
        expect(headerText).toBe('Welcome to the-internet')
    })
})