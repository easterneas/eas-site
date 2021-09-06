export async function getData (baseURL) {
  // console.log(await fetch(`https://berowra.easterneas.deta.app/api/collection/f3ka69fhistf?content`).then(res => res.json()))
  return await fetch(baseURL).then(res => res.json())
}
