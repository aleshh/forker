"use client"
import Image from "next/image"
import styles from "./Album.module.css"
import { Album as AlbumType } from "./types"

const baseUrl = "https://pitchfork.com"

export default function Album({ album: input }: { album: AlbumType }) {
  const { tombstone, genres: genresEntity, url } = input
  const { albums, bnm, bnr } = tombstone
  const { album, rating: rtg } = albums?.[0] || {}
  const { artists } = album || {}
  const name = album?.display_name
  const rating = rtg?.display_rating.replace(".0", "")
  const genres = genresEntity?.map((genre) => genre.display_name)
  const albumImageUrl = album?.photos.tout.sizes.homepageLarge
  const isBest = bnm || bnr
  const albumUrl = baseUrl + url

  return (
    <article className={styles.album}>
      {albumImageUrl && (
        <a className={styles.imageWrapper} href={albumUrl}>
          <Image
            src={albumImageUrl}
            alt={`${artists?.join(", ")}: ${name}`}
            fill
          />
        </a>
      )}
      <div className={styles.titleContainer}>
        <div
          aria-label="rating"
          className={`${styles.rating} ${isBest ? styles.bestNew : ""}`}
        >
          {rating}
        </div>
        <div>
          <h3 className={styles.artist}>
            {artists?.map((artist, index, array) => (
              <>
                <a key={artist.id} href={`${baseUrl}${artist.url}`}>
                  {artist.display_name}
                </a>
                {array.length - 1 !== index && " · "}
              </>
            ))}
          </h3>
          <h2 className={styles.name}>
            <a href={albumUrl}>{name}</a>
          </h2>
        </div>
      </div>
      <p className={styles.genreWrapper}>
        {genres?.map((genre) => (
          <span key={genre} className={styles.genre}>
            {genre}
          </span>
        ))}
      </p>
    </article>
  )
}
