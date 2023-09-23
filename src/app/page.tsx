"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "./page.module.css"
import Album from "./Album"
import devAlbums from "../../dev-albums"
import { Album as AlbumType } from "./types"

const dev = true

export default function Home() {
  const [albums, setAlbums] = useState<null | AlbumType[]>(null)

  useEffect(function loadAlbums() {
    if (dev) {
      setAlbums(devAlbums)
      return
    }

    const albums = (async function () {
      const response = await fetch(
        "https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=200&start=0"
      )
      const json = await response.json()
      const { list } = json.results
      console.log(list[0])
      setAlbums(list)
    })()
  }, [])

  if (!albums) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {albums.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
    </main>
  )
}
