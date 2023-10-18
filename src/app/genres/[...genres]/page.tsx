import Albums from "../../components/Albums"
import Header from "../../components/Header"

function getGenreName({ genres }: { genres: any }, genreToFind: string) {
  const genre = genres?.find((g: any) => g.slug === genreToFind)
  return genre.display_name
}

export default async function Genres({
  params,
}: {
  params: { genres: string[] }
}) {
  const genres = params.genres
    .map((genre) => `genre=${genre.split("-")[0]}&`)
    .join("")

  const response = await fetch(
    `https://pitchfork.com/api/v2/search/?${genres}types=reviews&hierarchy=sections/reviews/albums,channels/reviews/albums&sort=publishdate desc,position asc&size=200&start=0`
  )
  const json = await response.json()
  const albums = json.results.list

  const genreName = getGenreName(albums[0], params.genres[0])

  return (
    <>
      <Header text={`> Genre > ${genreName}`} />
      <Albums albums={albums} />
    </>
  )
}
