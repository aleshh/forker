import Albums from "./components/Albums"
import Header from "./components/Header"
import { getRecentReviews } from "./api/index"

export default async function Home() {
  const albums = await getRecentReviews()

  return (
    <>
      <Header />
      <Albums albums={albums} />
    </>
  )
}
