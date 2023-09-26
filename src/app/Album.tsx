"use client"
import Image from "next/image"
import styles from "./Album.module.css"
import { Album as AlbumType } from "./types"

const baseUrl = "https://pitchfork.com"

export default function Album({ album: input }: { album: AlbumType }) {
  const { tombstone, genres: genresEntity, url } = input
  const { albums, bnm, bnr } = tombstone
  const { album, rating: rtg } = albums?.[0] || {}
  const artist = album?.artists
    ?.map((artist) => artist.display_name)
    .join(" · ")
  const name = album?.display_name
  const rating = rtg?.display_rating.replace(".0", "")
  const genres = genresEntity?.map((genre) => genre.display_name)
  const albumImageUrl = album?.photos.tout.sizes.homepageLarge
  const isBest = bnm || bnr

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
        <div className={`${styles.rating} ${isBest ? styles.bestNew : ""}`}>
          {rating}
        </div>
        <h2>
          <span className={styles.artist}>{artist}</span>
          <br />
          <span className={styles.name}>{name}</span>
        </h2>
      </div>
      <p className={styles.genreWrapper}>
        {genres?.map((genre) => (
          <span key={genre} className={styles.genre}>
            {genre}
          </span>
        ))}
      </p>
    </a>
  )
}
