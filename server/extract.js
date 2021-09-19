import puppeteer from "puppeteer-core";

export class Extractor {
  async init() {
    const executablePath =
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    this.browser = await puppeteer.launch({ executablePath });
  }

  #unique(arr) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[0]) && res.set(a[0], 1));
  }

  async PageSearch(keyWord, start) {
    let page = await this.browser.newPage();
    await page.setJavaScriptEnabled(true);
    let q = encodeURI(keyWord.trim());
    let url = `https://www.google.com/search?q=${q}&start=${start}`;
    console.log(url);
    await page.goto(url, { waitUntil: "networkidle2" });
    let res = await page.evaluate(() => {
      let res = [];
      let query = "#rso div.g";
      let items = Array.from(document.querySelectorAll(query));
      for (const item of items) {
        let item_a = item.querySelector("a");
        res.push([item_a.href, item_a.innerText]);
      }
      return res;
    });
    await page.close();
    return this.#unique(res);
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
      function imageFilter(url) {
        let rules = ["TW_THWnt", ".svg", "WMA_button"];
        for (const reg of rules) {
          if (url.includes(reg)) return false;
        }
        return true;
      }

      const reUrl = "upload.wikimedia.org/wikipedia/commons";
      let imageLinks = [];
      let images = Array.from(document.querySelectorAll("img"));
      for (const img of images) {
        if (img.src.includes(reUrl) && imageFilter(img.src)) {
          let ctx = img.src;
          if (ctx.includes(`${reUrl}/thumb/`)) {
            ctx = ctx.replace("/thumb", "").replace(/\/[^\/]*?$/gm, "");
          }
          imageLinks.push(ctx);
        }
      }
      //返回结果
      return { attribute, imageLinks };
    });
    await page.close();
    return res;
  }

  async SearchAndExtract(keyWord, start) {
    let urlLinks = await this.PageSearch(keyWord, start);
    let searchUrl = "";
    for (let link of urlLinks) {
      if (link[0].includes("wikipedia.org")) {
        searchUrl = link[0];
        break;
      }
    }
    let [attribute, imageLinks] = [{}, []];
    if (searchUrl !== "")
      ({ attribute, imageLinks } = await this.extractInfo(searchUrl));
    return { urlLinks, attribute, imageLinks };
  }
}
