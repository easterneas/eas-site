import type { ResponseData } from "./base/Service";
import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const contactService = {
  getAll: async (): Promise<
    ResponseData<StrapiResponse<Contact[]>>
  > => {
    return new Service(
      serviceUrls.contactPath("?pagination[pageSize]=999999&pagination[withCount]=false&populate=*"),
    ).getWithoutToken({})
  },
};
