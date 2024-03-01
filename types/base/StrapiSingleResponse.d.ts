type StrapiSingleResponse<Entity> = {
  data: {
    id: number;
    attributes: Entity & {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  meta: {
    pagination: Record<"page" | "pageSize" | "pageCount" | "total", number>;
  };
};
