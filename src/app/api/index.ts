// import devAlbums from "../../../dev-albums"
import { Album } from "../types"
import { SearchParams } from "../types"

// todo: lots to refactor here

// const dev = process.env.NODE_ENV === "development"

const baseUrl = "https://pitchfork.com/api/v2/"

function createQueryString(genres: string[], minRating: string) {
  const params = new URLSearchParams()

  if (genres) {
    genres.forEach((genre) => {
      params.append("genre", genre)
    })
  }
  if (minRating) {
    params.set("rating_from", minRating.toString())
  }

  return params.toString()
}

async function pitchforkFetch(query: string): Promise<Album[]> {
  const response = await fetch(baseUrl + query, { cache: "no-store" })
  const json = await response.json()
  return json.results.list
}

export async function getRecentReviews(
  searchParams: SearchParams
): Promise<Album[]> {
  // if (dev) {
  //   return devAlbums
  // }

  const { genre, minRating } = searchParams
  const queryString = createQueryString(genre, minRating)

  return await pitchforkFetch(
    `search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=3&start=0&${queryString}`
  )
}

export async function getAlbumsByArtist(
  artistSlug: string,
  searchParams: SearchParams
): Promise<Album[]> {
  const { genre, minRating } = searchParams
  const queryString = createQueryString(genre, minRating)

  return await pitchforkFetch(
    `entities/artists/${artistSlug}/albumreviews/?size=200&start=0&${queryString}`
  )
}

export async function getAlbumsByGenre(
  genres: string[],
  searchParams: SearchParams
): Promise<Album[]> {
  const { genre, minRating } = searchParams
  const queryString = createQueryString(genre, minRating)

  const query = genres
    .map((genre: string) => `genre=${genre.split("-")[0]}&`)
    .join("")

  return await pitchforkFetch(
    `search/?${query}types=reviews&hierarchy=sections/reviews/albums,channels/reviews/albums&sort=publishdate desc,position asc&size=200&start=0&${queryString}`
  )
}
