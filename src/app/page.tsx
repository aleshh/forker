import Albums from "./components/Albums"
import Loader from "./loading"
import devAlbums from "../../dev-albums"
import { Album as AlbumType } from "./types"

const dev = process.env.NODE_ENV === "development"

function getCurrentDate() {
  const d = new Date()
  return `${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`
}

export default async function Home() {
  const albums = await (async function loadAlbums() {
    if (dev) {
      return devAlbums
    }

    const response = await fetch(
      "https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0"
    )
    const json = await response.json()
    return json.results.list
  })()

  return <Albums albums={albums} />
}
