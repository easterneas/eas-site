import type { ResponseData } from "./base/Service";
import serviceUrls from ".";
import { Service } from "./base/Service";
import type { StrapiResponse } from "types/base/StrapiResponse";

export const postService = {
  getAllPaginated: async (): Promise<ResponseData<StrapiResponse<Post[]>>> => {
    return new Service(
      serviceUrls.postPath("?sort[0]=published:desc&sort[1]=publishedAt:desc"),
    ).get({});
  },

  getAll: async (): Promise<ResponseData<StrapiResponse<Post[]>>> => {
    return new Service(
      serviceUrls.postPath(
        "?sort[0]=published:desc&sort[1]=publishedAt:desc&pagination[pageSize]=999999&pagination[withCount]=false",
      ),
    ).get({});
  },

  getRecents: async (): Promise<ResponseData<StrapiResponse<Post[]>>> => {
    return new Service(
      serviceUrls.postPath(
        "?sort[0]=published:desc&sort[1]=publishedAt:desc&pagination[pageSize]=3&pagination[withCount]=false",
      ),
    ).get({});
  },

  getOne: async (): Promise<ResponseData<StrapiResponse<Post>>> => {
    return new Service(serviceUrls.postPath()).get({});
  },

  getBySlug: async (
    slug: string,
  ): Promise<ResponseData<StrapiResponse<Post>>> => {
    return new Service(serviceUrls.onePostPath(slug)).get({});
  },
};
