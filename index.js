const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        executablePath:
            "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", // Provide the path to your Chrome executable
        headless: false,
        channel: "chrome",
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto("https://typing-speed-test.aoeu.eu/");
    await page.waitForSelector(".nextword");
    const words = await page?.evaluate(() => {
        const wordElemets = document.querySelectorAll(".nextword");
        const wordList = [document.querySelector(".currentword").innerText];
        wordElemets.forEach((word) => {
            wordList.push(word.innerText);
        });
        return wordList;
    });
    console.log(words);

    for (let i = 0; i < words.length; i++) {
        await page.type('#input', words[i]);
        await page.keyboard.press(String.fromCharCode(32))
    }
    // Close the browser when done
    // await browser.close();
})();
