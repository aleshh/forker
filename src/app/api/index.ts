// import devAlbums from "../../../dev-albums"
import { Album } from "../types"

// const dev = process.env.NODE_ENV === "development"

const baseUrl = "https://pitchfork.com/api/v2/"

async function pitchforkFetch(query: string): Promise<Album[]> {
  const response = await fetch(baseUrl + query, { cache: "no-store" })
  const json = await response.json()
  return json.results.list
}

export async function getRecentReviews(): Promise<Album[]> {
  // if (dev) {
  //   return devAlbums
  // }

  return await pitchforkFetch(
    `search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0`
  )
}

export async function getAlbumsByArtist(artistSlug: string): Promise<Album[]> {
  return await pitchforkFetch(
    `entities/artists/${artistSlug}/albumreviews/?size=200&start=0`
  )
}

export async function getAlbumsByGenre(genres: string[]): Promise<Album[]> {
  const query = genres
    .map((genre: string) => `genre=${genre.split("-")[0]}&`)
    .join("")

  return await pitchforkFetch(
    `search/?${query}types=reviews&hierarchy=sections/reviews/albums,channels/reviews/albums&sort=publishdate desc,position asc&size=200&start=0`
  )
}
