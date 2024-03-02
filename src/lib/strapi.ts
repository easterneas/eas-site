export const getImageUrlBySize = (image: StrapiImageData, size: 'small' | 'medium' | 'large' | 'thumbnail' = 'medium') => {
  if(!image.data) return null

  return image.data.attributes.formats[size].url
}