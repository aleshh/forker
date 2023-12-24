"use server"

export default async function getButtonLink(str: string) {
  console.log("fetching spotify link for", str)

  const response = await fetch(
    `https://songwhip.com/api/songwhip/search?q=${str}&country=US&limit=1`
  )

  if (!response.ok) throw new Error("Failed to get Spotify link from SongWhip")

  const json = await response.json()
  const { data } = json
  const { albums } = data
  const [album] = albums
  return album.sourceUrl
}
