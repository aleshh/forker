import devAlbums from "../../../dev-albums"

const dev = process.env.NODE_ENV === "development"

const baseUrl = "https://pitchfork.com/api/v2/"

export async function getRecentReviews() {
  if (dev) {
    return devAlbums
  }

  const response = await fetch(
    `${baseUrl}search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0`
  )
  const json = await response.json()
  return json.results.list
}

export async function getAlbumsByArtist(artistSlug: string) {
  const response = await fetch(
    `${baseUrl}entities/artists/${artistSlug}/albumreviews/?size=200&start=0`
  )
  const json = await response.json()
  return json.results.list
}

export async function getAlbumsByGenre(genres: string[]): Promise<Array<any>> {
  const query = genres
    .map((genre: string) => `genre=${genre.split("-")[0]}&`)
    .join("")

  const response = await fetch(
    `${baseUrl}search/?${query}types=reviews&hierarchy=sections/reviews/albums,channels/reviews/albums&sort=publishdate desc,position asc&size=200&start=0`
  )
  const json = await response.json()
  return json.results.list
}
