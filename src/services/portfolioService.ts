import type { ResponseData } from "./base/Service";
import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const portfolioService = {
  getAll: async (): Promise<
    ResponseData<StrapiResponse<Portfolio[]>>
  > => {
    return new Service(
      serviceUrls.portfolioPath(
        "?pagination[pageSize]=999999&pagination[withCount]=false&populate=*"
        )
      ).getWithoutToken({});
  },

  getOne: async (): Promise<
    ResponseData<StrapiResponse<Portfolio>>
  > => {
    return new Service(serviceUrls.portfolioPath()).getWithoutToken({});
  },
};
