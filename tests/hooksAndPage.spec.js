import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

let browser;
let context;
let page;

test.describe("describe block for hooks", () => {

    test.beforeAll(async () => {
        // launch chrome browser before all tests
        browser = await chromium.launch({headless: true})
        console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER")
    })
    
    test.beforeEach(async () => {
        // create context for a browser
        context = await browser.newContext()
        // create new page
        page = await context.newPage()
        // navigate to test url
        await page.goto('https://the-internet.herokuapp.com/');
        // pause execution
        console.log("BEFORE EACH LAUNCHED NEW PAGE")
        await page.pause()
    })
    
    test.afterEach(async () => {
        // close page and context
        await page.close()
        await context.close()
        console.log("AFTER EACH HOOK CLOSED PAGE")
    })
    
    test.afterAll(async () => {
        // closer browser
        await browser.close()
        console.log("AFTER ALL HOOK CLOSED BROWSER")
    })

    
    test('A/B Test', async () => {
        await page.click('text="A/B Testing"')
        const header = await page.textContent('h3')
        expect(header).toBe('A/B Test Control')
    })

    test('Checkbox verification', async () => {
        await page.click('text="Checkboxes"')
        const checkbox = await page.isChecked('input[type="checkbox"]:first-child')
        expect(checkbox).toBe(false)
    })

    test('Geolocation setting in context and verification', async () => {
        context = await browser.newContext({
            permissions: ['geolocation'],
            geolocation: { latitude: 37.774929, longitude: -122.419416 },
            viewport: { width: 1280, height: 720 }
        })
        page = await context.newPage()
        console.log("USING CONTEXT AND PAGE CREATE WITHIN TEST AND NOT WITHIN HOOKS")
        await page.pause()
        await page.goto('https://the-internet.herokuapp.com/geolocation');
        await page.click('button')
        const lat = await page.textContent("#lat-value")
        const long = await page.textContent("#long-value")
        expect(parseFloat(lat)).toBeCloseTo(37.774929)
        expect(parseFloat(long)).toBeCloseTo(-122.419416)
    })
})