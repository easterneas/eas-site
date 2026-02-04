type Post = Timestamp & {
  excerpt: string;
  content: {type: 'heading' | 'paragraph', level: number, children: {
    type: 'text' | unknown
    text: string
    code?: boolean
  }[]}[];
  postContent: string | null;
  created: string | null;
  updated: string | null;
  published: string | null;
  hero: string | null;

  title: string;
  slug: string;
};
