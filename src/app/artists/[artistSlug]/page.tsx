import Albums from "../../components/Albums"
import Header from "../../components/Header"

function getArtistName(album, artistToFind: string) {
  const artist = album.artists.find(
    (a) => a.url === `/artists/${artistToFind}/`
  )
  return artist.display_name
}

export default async function Artist({
  params: { artistSlug },
}: {
  params: { artistSlug: string }
}) {
  const response = await fetch(
    `https://pitchfork.com/api/v2/entities/artists/${artistSlug}/albumreviews/?size=200&start=0`
  )
  const json = await response.json()
  const albums = json.results.list

  const artistName = getArtistName(albums[0], artistSlug)

  return (
    <>
      <Header text={`> Artist > ${artistName}`} />
      <Albums albums={albums} />
    </>
  )
}
