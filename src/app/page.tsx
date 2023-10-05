"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"
import Album from "./Album"
import Loader from "./Loader"
import devAlbums from "../../dev-albums"
import { Album as AlbumType } from "./types"
import useShouldReset from "./utils/useShouldReset"

const dev = process.env.NODE_ENV === "development"

export default function Home() {
  const [albums, setAlbums] = useState<null | AlbumType[]>(null)
  const [error, setError] = useState("")
  const shouldReset = useShouldReset()

  useEffect(
    function loadAlbums() {
      if (dev) {
        setAlbums(devAlbums)
        return
      }

      if (albums && !shouldReset) return

      const controller = new AbortController()
      const fetchOptions = { signal: controller.signal }

      try {
        const albums = (async function () {
          const response = await fetch(
            "https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0",
            fetchOptions
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

      // return function () {
      //   controller.abort()
      // }
    },
    [albums, shouldReset]
  )

  if (error) {
    return `Error: ${error}`
  }

  if (!albums) {
    return <Loader />
  }

  return (
    <main>
      <div className={styles.albumContainer}>
        {albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
    </main>
  )
}
