type Portfolio = Timestamp & {
  id: number
  name: string
  description: string
  launched: string
  type: string
  status: PortfolioStatusEnum
  url: string
  avatar: StrapiImageData
}