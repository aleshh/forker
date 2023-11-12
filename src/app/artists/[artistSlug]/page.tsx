import Albums from "../../components/Albums"
import Header from "../../components/Header"
import { getAlbumsByArtist } from "../../api"
import { SearchParams } from "../../types"

function getArtistName(album: any, artistToFind: string) {
  if (!album?.artists) return ""

  const artist = album.artists.find(
    (a: any) => a.url === `/artists/${artistToFind}/`
  )
  return artist.display_name
}

export default async function Artist({
  params: { artistSlug },
  searchParams,
}: {
  params: { artistSlug: string }
  searchParams: SearchParams
}) {
  const albums = await getAlbumsByArtist(artistSlug, searchParams)

  const artistName = getArtistName(albums[0], artistSlug)

  return (
    <>
      <Header pageType="Artist" pageName={artistName} />
      <Albums albums={albums} />
    </>
  )
}
