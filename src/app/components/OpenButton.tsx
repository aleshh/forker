import { ReactNode } from "react"

export default function OpenButton({
  searchText,
  children,
}: {
  searchText: string
  children: ReactNode
}) {
  // const hello = await "hello"
  // console.log(hello)
  // const response = await fetch(
  //   `https://songwhip.com/api/songwhip/search?q=${searchText}&country=US&limit=1`
  // )
  // const json = await response.json()
  // const album = json.results.albums[0].sourceUrl
  // console.log(album)

  return (
    <button
      onClick={() => {
        console.log(searchText)
      }}
    >
      {children}
    </button>
  )
}
