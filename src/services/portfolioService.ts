import type { AxiosResponse } from "axios";

import serviceUrls from ".";
import { Service } from "./base/Service";

export const portfolioService = {
  getAll: async (): Promise<
    AxiosResponse<StrapiArrayResponse<Portfolio>, unknown>
  > => {
    return new Service(
      serviceUrls.portfolioPath(
        "?pagination[pageSize]=999999&pagination[withCount]=false&populate=*"
        )
      ).getWithoutToken({});
  },

  getOne: async (): Promise<
    AxiosResponse<StrapiSingleResponse<unknown>, unknown>
  > => {
    return new Service(serviceUrls.portfolioPath()).getWithoutToken({});
  },
};
