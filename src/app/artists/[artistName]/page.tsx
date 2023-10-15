import Albums from "../../components/Albums"

export default async function Artist({
  params,
}: {
  params: { artistName: string }
}) {
  const artistName = params.artistName
  const response = await fetch(
    `https://pitchfork.com/api/v2/search/more/?filter=albumreviews&query=${artistName}&size=24&start=0`
  )
  const json = await response.json()
  const albums = json.results.list

  return <Albums albums={albums} />
}
