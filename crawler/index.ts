import { JobStreetServices } from "@crawler/services/JobStreetServices";
import { DataServices } from "@crawler/services/DataServices";
import { config } from "@crawler/config";
import puppeteer from "puppeteer";

const initialize = async () => {
  const browser = await puppeteer.launch(config.puppeteerOptions);
  const js = await JobStreetServices.crawl(browser, config, {
    locations: ["", "jakarta"],
  });
  await DataServices.dataUpdater(js);
  console.log(js);
  await browser.close();
}

initialize();