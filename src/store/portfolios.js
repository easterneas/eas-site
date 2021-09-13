import { getData } from '../helpers/fetch'

async function getCollection () {
  return await getData(process.env.BRWR_PORTFOLIOS_COLLECTION_URL)
}

export default {
  getCollection,
  getPortfolios: async function () {
    const { items: portfolios } = await getCollection()

    return portfolios.map(item => {
      const meta = {}
      const content = {}
      const keys = Object.keys(item)
      const values = Object.values(item.content)

      keys.forEach(key => [ 'content' ].includes(key) ? '' : meta[key] = item[key])
      values.forEach(value => content[value.title] = value.value)

      return { ...meta, ...content }
    }).sort((a, b) => new Date(b.publishDate || b.created) - new Date(a.publishDate || a.created))
  }
}
