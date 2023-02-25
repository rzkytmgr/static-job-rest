import { ICConfig } from "@crawler/interfaces"

export const config: ICConfig = {
  browserUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X; sl-SI) AppleWebKit/532.50.1 (KHTML, like Gecko) Version/3.0.5 Mobile/8B115 Safari/6532.50.1',
  puppeteerOptions: {
    headless: true,
    args: ["--no-sandbox"]
  },
  targetWebsite: {
    jobStreet:  (location: string) =>  `https://www.jobstreet.co.id/id/job-search/computer-information-technology-jobs${location ? `-in-${location}` : ''}/?sort=createdAt`,
  },
}