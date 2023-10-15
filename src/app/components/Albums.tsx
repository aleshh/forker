"use client"
import styles from "./Albums.module.css"
import Album from "./Album"
import { Album as AlbumType } from "../types"

export default function Albums({ albums }: { albums: AlbumType[] }) {
  return (
    <div className={styles.albumContainer}>
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  )
}
