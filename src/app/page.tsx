import Albums from "./components/Albums"
import Header from "./components/Header"
import { getRecentReviews } from "./api/index"
import { SearchParams } from "./types"

type PageProps = {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: PageProps) {
  const albums = await getRecentReviews(searchParams)

  return (
    <>
      <Header />
      <Albums albums={albums} />
    </>
  )
}
