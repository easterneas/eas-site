import { getData } from '../helpers/fetch'

async function getCollection () {
  return await getData(process.env.BRWR_POSTS_COLLECTION_URL)
}

export default {
  getCollection,
  getPosts: async function () {
    const posts = (await getCollection()).items.map(item => {
      const meta = {}
      const content = {}
      const keys = Object.keys(item)
      const values = Object.values(item.content)

      keys.forEach(key => [ 'content' ].includes(key) ? '' : meta[key] = item[key])
      values.forEach(value => content[value.title] = value.value)

      return { ...meta, ...content }
    }).sort((a, b) => new Date(b.publishDate || b.created) - new Date(a.publishDate || a.created))

    return posts
  }
}

// export const postCollection = getData(process.env.BRWR_POSTS_COLLECTION_URL)

// export const posts = (await postCollection).items.map(item => ({
//   ...(function (post) {
//     const meta = {}
//     const keys = Object.keys(post)
//     keys.forEach(key => ['content'].includes(key) ? '' : meta[key] = post[key])
//     return meta
//   })(item),
//   ...(function (post) {
//     const content = {}
//     Object.values(post.content).forEach(value => content[value.title] = value.value)
//     return content
//   })(item)
// }))
