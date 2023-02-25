import { JobStreetServices } from "@crawler/services/JobStreetServices";
import { DataServices } from "@crawler/services/DataServices";
import { config } from "@crawler/config";
import puppeteer from "puppeteer";

const initialize = async () => {
  const browser = await puppeteer.launch(config.puppeteerOptions);
  const jobstreet = await JobStreetServices.crawl(browser, config, { locations: ["", "jakarta"] });
  await DataServices.dataUpdater(jobstreet);
  await browser.close();
}

initialize();