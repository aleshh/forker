"use client"
import Image from "next/image"
import styles from "./Album.module.css"
import { Album as AlbumType } from "./types"
import copyToClipboard from "./utils/copyToClipboard"

const baseUrl = "https://pitchfork.com"

function kebabCase(string: string | undefined): string {
  if (!string) return ""
  return string
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_'’`~()]/g, "")
    .replace(/ ep$/, "")
    .replaceAll(" ", "-")
}

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
  const songWhipLink = `https://songwhip.com/${kebabCase(
    artists?.[0]?.display_name
  )}/${kebabCase(name)}`

  // async function openInSpotify() {
  //   const response = await fetch(
  //     `https://songwhip.com/api/songwhip/search?q=${artists?.[0]} ${name}&country=US&limit=1`
  //   )
  //   const json = await response.json()
  //   const album = json.results.albums[0].sourceUrl
  //   console.log(album)
  // }

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
              <span key={artist.id}>
                <a href={`${baseUrl}${artist.url}`}>{artist.display_name}</a>
                {array.length - 1 !== index && " · "}
              </span>
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
        <a href={songWhipLink} style={{ marginLeft: 20 }}>
          OPEN
        </a>
        <a
          onClick={() =>
            copyToClipboard(`${artists?.[0]?.display_name} ${name}`)
          }
          style={{ marginLeft: 20 }}
        >
          COPY
        </a>
      </p>
    </article>
  )
}
