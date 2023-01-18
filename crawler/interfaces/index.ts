import { PuppeteerLaunchOptions } from "puppeteer";

interface ICConfig {
  'user-agent': string;
  options: PuppeteerLaunchOptions;
  servicesUrl: {
    jobStreet: (location: string) => string;
  };
}

export { ICConfig }