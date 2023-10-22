"use client"
import { useParams } from "next/navigation"
import styles from "./Albums.module.css"
import Album from "./Album"
import { Album as AlbumType } from "../types"

function isAlbumPage(params: any): boolean {
  return Object.keys(params)[0] === "artistSlug"
}

export default function Albums({ albums }: { albums: AlbumType[] }) {
  const params = useParams()
  const showYear = isAlbumPage(params)
  return (
    <main className={styles.albumContainer}>
      {albums.map((album) => (
        <Album key={album.id} album={album} showYear={showYear} />
      ))}
    </main>
  )
}
