type StrapiImageData = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: Record<
        "large" | "medium" | "small" | "thumbnail",
        StrapiImageFormat
      >;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      // TODO: determine this unknown type in the future.
      previewUrl: unknown | null;
      provider: string;
      // TODO: determine this unknown type in the future.
      provider_metadata: unknown | null;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
};
