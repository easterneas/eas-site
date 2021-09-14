import { getData } from '../helpers/fetch'

async function getCollection () {
  return await getData(process.env.BRWR_POSTS_COLLECTION_URL)
}

async function getPosts () {
  const { items: posts } = await getCollection()

  return posts.map(item => {
    const meta = {}
    const content = {}
    const keys = Object.keys(item)
    const values = Object.values(item.content)

    keys.forEach(key => [ 'content' ].includes(key) ? '' : meta[key] = item[key])
    values.forEach(value => content[value.title] = value.value)

    return { ...meta, ...content }
  }).sort((a, b) => new Date(b.publishDate || b.created) - new Date(a.publishDate || a.created))
}

export default {
  getCollection,
  getPosts
}

