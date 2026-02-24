const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: "./chrome-profile"
    });
    
    const page = await browser.newPage();

    await page.goto("https://www.dominos.com/", {
        waitUntil: "networkidle2"
    });

    await page.waitForSelector("a");

    const isLoggedOut = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll("a"));
        return links.some(a => 
        (a.textContent || "").trim().toLowerCase() === "Sign In"
        );
    });

    if(isLoggedOut){
        console.log("Not Logged In.");
        console.log("Please Log in. Browser will stay open.");
        return;
    }

    const links = await page.evaluate(() => {
    const anchorTags = Array.from(document.querySelectorAll("a"));

    return anchorTags
        .map(a => a.textContent.trim())
        .filter(text => text.length > 0);
});

    console.log("Found links:");
    console.log(links.slice(0, 10));
    console.log(isLoggedOut);
    
})();