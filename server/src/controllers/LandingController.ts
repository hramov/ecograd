import appRootPath from "app-root-path";
import { Request, Response } from "express";
import { writeFileSync } from "fs";
import { LandingProvider } from "../providers/LandingProvider";
import { toConsole } from "../utils/log";
import { Controller, IExpert, IFeedback } from "./Controller";

export class LandingController extends Controller {
  async getExperts(req: Request, res: Response) {
    const result = await new LandingProvider().getExperts();
    res.status(200).json(result);
  }

  async getExpertById(req: Request, res: Response) {
    const result = await new LandingProvider().getExpertById(
      Number(req.params.id)
    );
    if (result.data.length == 1) {
      const editedResult: IExpert = result.data[0];
      editedResult.birth_date = new Date(editedResult.birth_date)
        .toLocaleDateString("ko-KR")
        .split(". ")
        .map((chan) => (chan.length == 1 ? "0" + chan : chan))
        .join("-")
        .split(".")[0];

      res.status(200).json({
        status: result.status,
        data: editedResult,
      });
      return;
    }
    res.status(500).json({
      status: false,
      data: "Database error",
    });
  }

  async addExpert(req: Request, res: Response) {
    const result = await new LandingProvider().addExpert(req.body.expert);
    res.status(200).json(result);
  }

  async editExpert(req: Request, res: Response) {
    const expert = JSON.parse(req.body.expert);
    expert.image_url = `${process.env.IMAGE_URL}/${expert.id}.png`;
    if (req.file && expert.id) {
      toConsole("Check", "debug");
      const path = `${appRootPath}/uploads/${expert.image_url}`;
      writeFileSync(path, req.file!.buffer);
      const result = await new LandingProvider().editExpert(
        expert,
        Number(req.params.id)
      );
      res.status(200).send({
        status: true,
        data: `Successfully updated expert ${expert.last_name} ${expert.name}`,
      });
      return;
    }
    res.status(500).json({
      status: false,
      data: "Data error",
    });
  }

  async deleteExpert(req: Request, res: Response) {
    const result = await new LandingProvider().deleteExpert(
      Number(req.params.id)
    );
    if (result.status) res.status(200).send(result.data.join());
    else res.status(500).send(result.data.join());
  }

  async writeFeedback(req: Request, res: Response) {
    const feedback: IFeedback = req.body.feedback
    feedback.created_at = new Date(Date.now())
    const result = await new LandingProvider().writeFeedback(feedback);
    if (result.status) {
      res.status(200).send({
        status: result.status,
        data: result.data
      });
      return
    }
    res.status(500).send({
      status: result.status,
      data: result.data
    });
  }
}
