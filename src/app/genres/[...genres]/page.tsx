import { getAlbumsByGenre } from "@/app/api"
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
  const albums = await getAlbumsByGenre(params.genres)

  const genreName = getGenreName(albums[0], params.genres[0])

  return (
    <>
      <Header text={`> Genre > ${genreName}`} />
      <Albums albums={albums} />
    </>
  )
}
