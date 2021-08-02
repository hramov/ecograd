import { getRepository, Repository } from "typeorm";
import { IExpert, IFeedback } from "../controllers/Controller";
import { Experts } from "../database/entity/Experts";
import { Feedback } from "../database/entity/Feedback";

import { Provider, LandingProviderResponse } from "./Provider";

export class LandingProvider extends Provider {
  async getExperts(): Promise<LandingProviderResponse> {
    return {
      status: true,
      data: await getRepository(Experts).find(),
    };
  }

  async getExpertById(id: number): Promise<LandingProviderResponse> {
    return {
      status: true,
      data: await getRepository(Experts).find({
        where: [
          {
            id: id,
          },
        ],
      }),
    };
  }

  async addExpert(expert: Experts): Promise<LandingProviderResponse> {
    console.log(expert)
    return {
      status: true,
      data: new Array(await getRepository(Experts).save(expert)),
    };
  }

  async editExpert(
    expert: Experts,
    id: number
  ): Promise<LandingProviderResponse> {
    return {
      status: true,
      data: new Array(await getRepository(Experts).update(id, expert)),
    };
  }

  async deleteExpert(id: number): Promise<LandingProviderResponse> {
    const result = await getRepository(Experts).delete(id);
    if (result.affected! > 0) {
      return {
        status: true,
        data: ["Success deleting user"],
      };
    }
    return {
      status: false,
      data: ["Error"],
    };
  }

  async writeFeedback(feedback: IFeedback): Promise<LandingProviderResponse> {
    const result = await getRepository(Feedback).save(feedback);
    if (result) {
      return {
        status: true,
        data: [result],
      };
    }
    return {
      status: true,
      data: ["Error"],
    };
  }
}
