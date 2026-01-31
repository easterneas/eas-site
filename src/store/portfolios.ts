import { portfolioService } from "@/services/portfolioService";

async function getCollection() {
  try {
    const collections = await portfolioService.getAll();
    return collections;
  } catch (e) {
    console.error(e);
  }
}

export default {
  getCollection,
  getPortfolios: async (): Promise<{ data: Portfolio[], meta: {pagination: Record<"page" | "pageSize" | "pageCount" | "total", number>} | null }> => {
    const response = await getCollection();
    if (!response) return {data: [], meta: null};

    const {
      data: { data, meta: paginationMeta },
    } = response;

    const portfolios = data.sort(
      (a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt)
    )

    return {
      data: portfolios,
      meta: paginationMeta,
    };
  },
};
