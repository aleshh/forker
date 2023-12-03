import { redirect } from "next/navigation"
import { getSearchResults } from "@/app/api"
import Header from "../../components/Header"

type Artist = {
  name: string
  display_name: string
  url: string
}

export default async function Search({
  params: { searchString },
}: {
  params: { searchString: string }
}) {
  const matchString = searchString.replaceAll("%20", " ").toLowerCase()
  const artists = await getSearchResults(matchString)

  const artist = (function findArtist() {
    console.log("searching for", matchString)
    const exactMatch = artists.find(
      (artist: Artist) => artist.name.toLowerCase() === matchString
    )
    if (exactMatch) return exactMatch

    const includesMatch = artists.find((artist: Artist) =>
      artist.name.toLowerCase().includes(matchString)
    )
    if (includesMatch) return includesMatch

    return null
  })()

  if (artist) {
    redirect(artist.url)
  }

  return (
    <>
      <Header pageType="Search" pageName={searchString} />
      <div
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>No results for &quot;{searchString}&quot;</p>
      </div>
    </>
  )
}
