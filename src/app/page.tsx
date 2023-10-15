"use client"

import { useState, useEffect } from "react"
import Albums from "./components/Albums"
import Loader from "./Loader"
import devAlbums from "../../dev-albums"
import { Album as AlbumType } from "./types"

const dev = process.env.NODE_ENV === "development"

function getCurrentDate() {
  const d = new Date()
  return `${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`
}

export default function Home() {
  const [albums, setAlbums] = useState<null | AlbumType[]>(null)
  const [error, setError] = useState("")
  const [date, setDate] = useState(getCurrentDate())

  useEffect(
    function loadAlbums() {
      if (dev) {
        setAlbums(devAlbums)
        return
      }

      function fetchData() {
        try {
          const albums = (async function () {
            const response = await fetch(
              "https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0"
            )
            const json = await response.json()
            const { list } = json.results
            setAlbums(list)
          })()
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError("unknown error")
          }
        }
      }

      fetchData()

      const intervalId = setInterval(() => {
        if (getCurrentDate() !== date) {
          fetchData()
          setDate(getCurrentDate())
        }
      }, 1000)

      return () => clearInterval(intervalId)
    },
    [date]
  )

  if (error) {
    return `Error: ${error}`
  }

  if (!albums) {
    return <Loader />
  }

  return <Albums albums={albums} />
}
