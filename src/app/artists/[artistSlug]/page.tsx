import Albums from "../../components/Albums"
import Header from "../../components/Header"
import { getAlbumsByArtist } from "../../api"

function getArtistName(album: any, artistToFind: string) {
  const artist = album.artists.find(
    (a: any) => a.url === `/artists/${artistToFind}/`
  )
  return artist.display_name
}

export default async function Artist({
  params: { artistSlug },
}: {
  params: { artistSlug: string }
}) {
  const albums = await getAlbumsByArtist(artistSlug)

  const artistName = getArtistName(albums[0], artistSlug)

  return (
    <>
      <Header text={`> Artist > ${artistName}`} />
      <Albums albums={albums} />
    </>
  )
}
