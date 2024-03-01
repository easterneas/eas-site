import store from "@/store";
import dateParser from "@/utils/parsers/dateParser";
import rss, { type RSSOptions } from "@astrojs/rss";

const baseRssOptions: RSSOptions = {
  xmlns: { h: 'http://www.w3.org/TR/html4/' },
  customData: '<language>en-us</language>',
  site: "https://eas.web.id",
  title: 'Eas',
  description: 'Full stack developer. Mentor. Loves tinkering all things tech.',
  items: []
}

export async function GET() {
  const { posts: postCollection } = store
  const response = await postCollection.getPosts()

  if(!response) return rss(baseRssOptions)

  const { data } = response

  return rss({
    ...baseRssOptions,
    items: data.map(post => ({
      title: post.title,
      description: post.excerpt || '',
      link: `/blog/post/${post.slug}`,
      pubDate: dateParser(post.created || post.createdAt).toDate(),
    }))
  })
}
