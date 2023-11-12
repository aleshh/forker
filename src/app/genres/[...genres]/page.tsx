import { getAlbumsByGenre } from "@/app/api"
import Albums from "../../components/Albums"
import Header from "../../components/Header"
import { Album } from "../../types"
import { SearchParams } from "../../types"

function getGenreName({ genres }: Album, genreToFind: string): string {
  const genre = genres?.find((g: any) => g.slug === genreToFind)
  return genre ? genre.display_name : ""
}

export default async function Genres({
  params,
  searchParams,
}: {
  params: { genres: string[] }
  searchParams: SearchParams
}) {
  const albums = await getAlbumsByGenre(params.genres, searchParams)

  const genreName = getGenreName(albums[0], params.genres[0])

  return (
    <>
      <Header pageType="Genre" pageName={genreName} />
      <Albums albums={albums} />
    </>
  )
}
