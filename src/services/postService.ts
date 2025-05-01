import type { AxiosResponse } from "axios";

import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const postService = {
  getAllPaginated: async (): Promise<
    AxiosResponse<StrapiResponse<Post[]>, unknown>
  > => {
    return new Service(
      serviceUrls.postPath("?sort[0]=published:desc&sort[1]=publishedAt:desc"),
    ).getWithoutToken({});
  },

  getAll: async (): Promise<
    AxiosResponse<StrapiResponse<Post[]>, unknown>
  > => {
    return new Service(
      serviceUrls.postPath("?sort[0]=published:desc&sort[1]=publishedAt:desc&pagination[pageSize]=999999&pagination[withCount]=false"),
    ).getWithoutToken({});
  },

  getRecents: async (): Promise<
    AxiosResponse<StrapiResponse<Post[]>, unknown>
  > => {
    return new Service(
      serviceUrls.postPath("?sort[0]=published:desc&sort[1]=publishedAt:desc&pagination[pageSize]=3&pagination[withCount]=false"),
    ).getWithoutToken({});
  },

  getOne: async (): Promise<
    AxiosResponse<StrapiResponse<Post>, unknown>
  > => {
    return new Service(serviceUrls.postPath()).getWithoutToken({});
  },

  getBySlug: async (
    slug: string,
  ): Promise<AxiosResponse<StrapiResponse<Post>, unknown>> => {
    return new Service(
      serviceUrls.onePostPath(slug),
    ).getWithoutToken({});
  },
};
