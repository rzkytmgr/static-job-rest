import fs, { promises as fspromise } from 'fs';
import path from "path";

export class DataServices {
  public static dataUpdater(data: any, filename: string = "0", override: boolean = false) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileExtension = "json";
        const dataPath = path.join(process.cwd(), 'data', [filename, fileExtension].join('.'));
        let jobs: any = await fspromise.readFile(dataPath, "utf-8");
        
        if (!fs.existsSync(dataPath) || !Array.isArray(jobs)) {
          jobs = [];
          await fspromise.writeFile(dataPath, JSON.stringify(jobs), {
            encoding: "utf-8",
          });
        }
    
        if (override) {
          await fspromise.writeFile(dataPath, JSON.stringify(data), {
            encoding: "utf-8",
          });
        } else {
          jobs.push(...data);
          await fspromise.writeFile(dataPath, JSON.stringify(jobs), {
            encoding: "utf-8",
          });
        }
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}