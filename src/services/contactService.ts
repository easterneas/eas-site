import type { AxiosResponse } from "axios";

import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const contactService = {
  getAll: async (): Promise<
    AxiosResponse<StrapiResponse<Contact[]>, unknown>
  > => {
    return new Service(
      serviceUrls.contactPath("?pagination[pageSize]=999999&pagination[withCount]=false&populate=*"),
    ).getWithoutToken({})
  },
};
