"use client"
import Image from "next/image"
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
  const rating = rtg?.display_rating
  const genres = genresEntity?.map((genre) => genre.display_name).join(", ")
  const albumImageUrl = album?.photos.tout.sizes.homepageLarge

  return (
    <a href={baseUrl + url} target="_blank">
      <div style={{ border: "1px solid lime" }}>
        {albumImageUrl && (
          <div style={{ position: "relative", width: 300, height: 300 }}>
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
        <h2>
          {artist}: {name}
        </h2>
        <p>
          Rating: <strong>{rating}</strong> Genres: <strong>{genres}</strong>
        </p>
      </div>
    </a>
  )
}
