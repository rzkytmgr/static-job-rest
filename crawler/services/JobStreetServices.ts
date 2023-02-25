import { ICConfig, IJobResultMapped, IServiceOptions } from "@crawler/interfaces";
import { Browser, Page } from "puppeteer";
import { v4 } from "uuid";

export class JobStreetServices {
  static async crawl(browser: Browser, config: ICConfig,  options?: IServiceOptions) {
    const page = await browser.newPage();
    const result = [];

    if (options.locations && options.locations.length < 1) {
      const targetWebsite = config.targetWebsite.jobStreet();
      await JobStreetServices.evaluate(page, targetWebsite, result);
    } else {
      for (const location of options.locations) {
        const targetWebsite = config.targetWebsite.jobStreet(location);
        await JobStreetServices.evaluate(page, targetWebsite, result);
      }
    }

    await page.close();
    return result;
  }

  private static async evaluate(page: Page, targetWebsite: string, result: any[]) {
    await page.goto(targetWebsite, {
      waitUntil: "networkidle0",
    });

    // @ts-ignore
    const jobs = await page.evaluate(() => window.REDUX_STATE.result.jobs);

    for (const job of jobs) {
      if (!job.jobUrl || result.find(detail => job.jobUrl.includes(detail.url))) {
        console.log(job.jobUrl, "SKIPPED");
        continue;
      }

      await page.goto(job.jobUrl, {
        waitUntil: "networkidle0",
      });

      // @ts-ignore
      const detail = await page.evaluate(() => window.REDUX_STATE.details);
      result.push(JobStreetServices.objectJobMapper(detail));
    }
  }

  private static objectJobMapper(data: any) {
    return {
      _rid: v4(),
      title: data.header.jobTitle,
      categories: data.jobDetail.jobRequirement.jobFunctionValue.map(({ name }) => name),
      type: data.jobDetail.jobRequirement.employmentType,
      url: data.pageUrl,
      locations: data.location.map(({ location }) => location),
      createdAt: new Date(data.header.postedAt),
      salary: {
        visible: data.header.salary.isVisible,
        currency: data.header.salary.currency,
        max: data.header.salary.max,
        min: data.header.salary.min,
        period: data.header.salary.type,
      },
      company: {
        name: data.header.company.name,
        logo: data.header.logoUrls.large || data.header.logoUrls.medium || data.header.logoUrls.normal || data.header.logoUrls.small,
        website: data.companyDetail.companyWebsite,
        phone: data.companyDetail.companySnapshot.telephoneNumber,
      },
      career: {
        level: data.jobDetail.jobRequirement.careerLevel,
        qualifications: data.jobDetail.jobRequirement.qualification?.split(/, /),
      },
      benefit: data.jobDetail.jobRequirement.benefits,
    }
  }
}