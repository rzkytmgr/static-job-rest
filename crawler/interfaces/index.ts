import { Browser, PuppeteerLaunchOptions } from "puppeteer";

interface ICConfig {
  browserUserAgent: string;
  puppeteerOptions: PuppeteerLaunchOptions,
  targetWebsite: {
    jobStreet: (location?: string) => string;
  };
}

interface IServiceOptions {
  locations?: string[],
  categories?: string[],
}

interface IJobResultMapped {
  _rid: string;
  title: string;
  role: string;
  gender: string;
  type: string;
  location: string;
  url: string;
  quota: number;
  email: string;
  phone: string;
  createAt: string;
  category: string;
  company: {
    name: string;
    picture: string;
    address: string;
  },
  salary: {
    min: number;
    max: number;
    period: string;
    secret: boolean;
    currency: string;
  },
  requirement: {
    degree: string;
    married: boolean;
    disabilities: boolean;
    experience: string;
    age: {
      min: number;
      max: number;
    }
  }
}

export { 
  ICConfig, 
  IJobResultMapped,
  IServiceOptions,
}