import { Controller, IExpert } from "./Controller";
import csv from "csv-parse";
import { Request, Response } from "express";
import {
  createReadStream,
  createWriteStream,
  unlinkSync,
  writeFileSync,
} from "fs";
import rootPath from "app-root-path";

import archiver from "archiver";
import { FileArray } from "express-fileupload";
import { ClientProvider } from "../providers/ClientProvider";

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

  async uploadOrderFiles(req: Request, res: Response) {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const path = `${rootPath}/uploads/orders/${req.params.client_id}_${req.params.order_id}.zip`;
    const url = `static/uploads/orders/${req.params.client_id}_${req.params.order_id}.zip`
    const output = createWriteStream(path);

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(output);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      archive.append(files[i].buffer, { name: files[i].originalname });
    }
    archive.finalize();

    const result = await new ClientProvider().addOrderFileUrl(
      Number(req.params.order_id),
      url
    );

    if (result.status) console.log("Успешно")

    res.status(200).json({
      status: true,
      data: "Документы успешно загружены",
    });
  }
}
