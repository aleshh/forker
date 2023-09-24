"use client"
import Image from "next/image"
import styles from "./Album.module.css"
import { Album as AlbumType } from "./types"

const baseUrl = "https://pitchfork.com"

export default function Album({ album: input }: { album: AlbumType }) {
  const { tombstone, genres: genresEntity, url } = input
  const { albums } = tombstone
  const { album, rating: rtg } = albums?.[0] || {}
  const artist = album?.artists
    ?.map((artist) => artist.display_name)
    .join(" · ")
  const name = album?.display_name
  const rating = rtg?.display_rating.replace(".0", "")
  const genres = genresEntity?.map((genre) => genre.display_name).join(", ")
  const albumImageUrl = album?.photos.tout.sizes.homepageLarge

  return (
    <a href={baseUrl + url} target="_blank" className={styles.album}>
      {albumImageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={albumImageUrl}
            alt={`${artist}: ${name}`}
            fill
            // layout="fill"
            objectFit="contain"
            // width="320"
            // height="320"
          />
        </div>
      )}
      <div className={styles.titleContainer}>
        <div className={styles.rating}>{rating}</div>
        <h2>
          <span className={styles.artist}>{artist}</span>
          <br />
          <span className={styles.name}>{name}</span>
        </h2>
      </div>
      <p>
        <strong>{genres}</strong>
      </p>
    </a>
  )
}
