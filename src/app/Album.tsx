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
          <Image src={albumImageUrl} alt={`${artist}: ${name}`} fill />
        </div>
      )}
      <div className={styles.titleContainer}>
        <div
          aria-label="rating"
          className={`${styles.rating} ${isBest ? styles.bestNew : ""}`}
        >
          {rating}
        </div>
        <div>
          <h3 className={styles.artist}>{artist}</h3>
          <h2 className={styles.name}>{name}</h2>
        </div>
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
