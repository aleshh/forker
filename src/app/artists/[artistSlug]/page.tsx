import Albums from "../../components/Albums"

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

  return <Albums albums={albums} />
}
