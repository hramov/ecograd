import { Controller, IExpert } from "./Controller";
import csv from "csv-parse";
import { Request, Response } from "express";
import { createReadStream, unlinkSync, writeFileSync } from "fs";
import rootPath from "app-root-path";

import archiver from 'archiver'

export class DataController extends Controller {
  
  importExperts(req: Request, res: Response) {
    const experts: IExpert[] = [];
    let counter: number = 0;
    const fileName = `${rootPath}/uploads/csv/${req.file!.fieldname}.csv`;
    const data = req.file?.buffer;

    writeFileSync(fileName, data!);
    createReadStream(fileName)
      .pipe(csv())
      .on("data", (data) => {
        if (counter > 0) {
          experts.push({
            last_name: data[0],
            name: data[1],
            second_name: data[2],
            image_url: data[3],
            email: data[4],
            phone: data[5],
            position: data[6],
            birth_date: data[7],
            cert: data[8],
            direction: data[9],
            misc: data[10],
            created_at: new Date(Date.now()),
          });
        }
        counter++;
      })
      .on("end", () => {
        console.log(`Successfully uploaded experts: ${counter}`);
        unlinkSync(fileName);
      });

    res.status(200).send("OK");
  }

  uploadOrderFiles(req: Request, res: Response) {
    
  }
}
