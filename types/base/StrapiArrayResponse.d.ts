type StrapiArrayResponse<Entity> = {
  data: {
    id: number;
    attributes: Omit<Entity, "id"> & {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
