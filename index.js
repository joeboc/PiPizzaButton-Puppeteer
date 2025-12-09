const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,           // Allow browser to show
        defaultViewport: null,     // optional
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();
    await page.goto('https://www.dominos.com/');

    const orderHandles = await page.$$('sv-flex sv-grow sv-items-center sv-gap-medium');
    
    await page.click(
        "#main-content > section > header > div > div.sh-hidden.sh-p-large.sh-pizza-box-shaped-header-notch.md\\:sh-block > div > p > a:nth-child(1)"
    );

    console.log("Clicked delivery!");
})();