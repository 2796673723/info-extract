import puppeteer from "puppeteer-core";

export class Extractor {
  async init() {
    const executablePath =
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    this.browser = await puppeteer.launch({ executablePath });
  }

  async extractInfo(url) {
    let page = await this.browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url, { waitUntil: "networkidle2" });
    let res = await page.evaluate(() => {
      //提取属性
      let attribute = {};
      let query =
        "#mw-content-text > div.mw-parser-output > table.infobox > tbody > tr";
      let items = document.querySelectorAll(query);
      for (let i = 0; i < items.length; i++) {
        let name = items[i].querySelector("th")?.innerText;
        let value = items[i].querySelector("td")?.innerText;
        if (name && value) attribute[name] = value.trim();
      }
      //获取照片
      const reUrl = "upload.wikimedia.org/wikipedia/commons/thumb/";
      let imageLinks = [];
      let images = Array.from(document.querySelectorAll("img"));
      for (const img of images) {
        if (img.src.includes(reUrl)) {
          let ctx = img.src.replace("/thumb", "").replace(/\/[^\/]*?$/gm, "");
          if (!ctx.endsWith(".svg")) {
            imageLinks.push(ctx);
          }
        }
      }
      // return imageLinks;
      return { attribute, imageLinks };
    });
    await page.close();
    return res;
  }
}
