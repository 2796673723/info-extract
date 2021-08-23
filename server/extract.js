import puppeteer from "puppeteer-core";

export class Extractor {
  async init() {
    const executablePath =
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    this.browser = await puppeteer.launch({ executablePath });
  }

  async extactInfo(url) {
    let page = await this.browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url, { waitUntil: "networkidle2" });
    let res = await page.evaluate(() => {
      let res = {};
      let query =
        "#mw-content-text > div.mw-parser-output > table.infobox > tbody > tr";
      let items = content.querySelectorAll(query);
      for (let i = 0; i < items.length; i++) {
        let name = items[i].querySelector("th")?.innerText;
        let value = items[i].querySelector("td")?.innerText;
        if (name && value) res[name] = value.trim();
      }
      return res;
    });
    await page.close();
    return res;
  }
}
