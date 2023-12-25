"use client"
import { useState } from "react"
import Image from "next/image"
import { FiCopy } from "react-icons/fi"
import { SlSocialSpotify } from "react-icons/sl"
import styles from "./Album.module.css"
import { Album as AlbumType } from "../types"
import Button from "./Button"
import getButtonLink from "../utils/getSpotifyLink"
import copyToClipboard from "../utils/copyToClipboard"
import useSearchParamsString from "../utils/useSearchParamsString"

const baseUrl = "https://pitchfork.com"

function getGenreUrl(genre: string): string {
  const lowercase = genre.toLowerCase().replaceAll("/", "-")
  const index = lowercase.indexOf("-")
  if (index === -1) return lowercase
  return lowercase.substring(0, index)
}

export default function Album({
  album: input,
  showYear,
}: {
  album: AlbumType
  showYear: boolean
}) {
  const [isHovered, setHovered] = useState(false)
  const searchParamsString = useSearchParamsString()
  const { tombstone, genres: genresEntity, url } = input
  const { albums, bnm, bnr } = tombstone
  const { album, rating: rtg, labels_and_years } = albums?.[0] || {}
  const { artists } = album || {}
  const name = album?.display_name
  const rating = rtg?.display_rating.replace(".0", "")
  const genres = genresEntity?.map((genre) => genre.display_name)
  const albumImageUrl = album?.photos.tout.sizes.homepageLarge
  const isBest = bnm || bnr
  const albumUrl = baseUrl + url

  async function openInSpotify() {
    const spotifyUrl = await getButtonLink(
      `${artists?.[0].display_name} ${name}`
    )
    // const target = "_blank"
    // const windowFeatures = ""

    window.open(spotifyUrl)
  }

  return (
    <article className={styles.album}>
      {albumImageUrl && (
        <a
          tabIndex={-1}
          target="_blank"
          className={styles.imageWrapper}
          href={albumUrl + searchParamsString}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={albumImageUrl}
            alt={`${artists?.join(", ")}: ${name}`}
            fill
          />
        </a>
      )}
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h3 className={styles.artist}>
            {artists?.map((artist, index, array) => (
              <span key={artist.id}>
                <a href={artist.url + searchParamsString}>
                  {artist.display_name}
                </a>
                {array.length - 1 !== index && " · "}
              </span>
            ))}
          </h3>
          <h2 className={isHovered ? styles.nameUnderlined : styles.name}>
            <a href={albumUrl + searchParamsString}>{name}</a>
          </h2>
          {showYear && (
            <div>
              {album?.release_year}
              {labels_and_years?.map((item) =>
                item.year === album?.release_year ? "" : ` (${item.year})`
              )}
            </div>
          )}
        </div>
        <div
          aria-label="rating"
          className={`${styles.rating} ${isBest ? styles.bestNew : ""}`}
        >
          {rating}
        </div>
      </div>
      <footer>
        <div className={styles.genreWrapper}>
          {genres?.map((genre) => (
            <a
              key={genre}
              href={`/genres/${getGenreUrl(genre)}`}
              className={styles.genre}
            >
              {genre}
            </a>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() =>
              copyToClipboard(`${artists?.[0]?.display_name} ${name}`)
            }
          >
            <FiCopy />
          </Button>
          <Button onClick={openInSpotify}>
            <SlSocialSpotify />
          </Button>
        </div>
      </footer>
    </article>
  )
}
