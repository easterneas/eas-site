type Post = Timestamp & {
  excerpt: string;
  content: string | null;
  postContent: string | null;
  created: string | null;
  updated: string | null;
  published: string | null;

  title: string;
  slug: string;
};
