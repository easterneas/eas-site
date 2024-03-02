import type { AxiosResponse } from "axios";

import serviceUrls from ".";
import { Service } from "./base/Service";

export const contactService = {
  getAll: async (): Promise<
    AxiosResponse<StrapiArrayResponse<Contact>, unknown>
  > => {
    return new Service(
      serviceUrls.contactPath("?pagination[pageSize]=999999&pagination[withCount]=false&populate=*"),
    ).getWithoutToken({})
  },
};
