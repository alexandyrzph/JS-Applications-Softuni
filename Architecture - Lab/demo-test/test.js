const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;

describe('E2E tests', async function () {
    this.timeout(5000);
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });


    it('Initial load', async () => {
        await page.goto('http://localhost:5500');

        // wait untill something is rendered on the page

        await page.waitForSelector('.accordion');

        const content = await page.textContent('#main');
        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });

    it('more button works', async () => {
        // tells the browser to go to the page
        // that we choose in goto fn field
        await page.goto('http://localhost:5500');
        // we wait until selector shows on the page 
        // selector will be in the waitForSelector fn 
        // we add valid css selector could be id className or something else 
        await page.waitForSelector('.accordion');
        // when selector is found we click on the button
        // that has textContent More 
        // 'text=More' is textContent selector 
        // 'text="More" is same but it's case sensitive
        await page.click('text=More');
        // we wait for response from the url
        await page.waitForResponse(/articles\/details/i);
        // checking if the selected item is visible
        // page.isVisible() returns true of false
        const visible = await page.isVisible('.accordion p');

        expect(visible).to.be.true;
    })
    
    it('Less button works', async () => {
        await page.goto('http://localhost:5500');
        await page.waitForSelector('.accordion');

        await page.click('text=More');
        await page.waitForResponse(/articles\/details/i);

        await page.waitForSelector('.accordion p', { state: 'visible' });

        await page.click('text=Less');

        const visible = await page.isVisible('.accordion p');

        expect(visible).to.be.false;
    });
})