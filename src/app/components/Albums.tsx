"use client"
import Image from "next/image"
import { FiShare, FiCopy } from "react-icons/fi"
import styles from "./Albums.module.css"
import Album from "./Album"
import { Album as AlbumType } from "../types"
import copyToClipboard from "../utils/copyToClipboard"

export default function Albums({ albums }: { albums: AlbumType[] }) {
  return (
    <div className={styles.albumContainer}>
      {albums.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  )
}
