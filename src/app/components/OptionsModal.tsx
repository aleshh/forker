"use client"
import { useCallback, useEffect, useState, ChangeEvent } from "react"
import {
  usePathname,
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation"
import styles from "./OptionsModal.module.css"
// eslint-disable-next-line no-unused-vars
import Button from "@mui/joy/Button"
import Modal from "@mui/joy/Modal"
import Slider from "@mui/joy/Slider"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import ListItem from "@mui/joy/ListItem"

const genres: Record<string, string> = {
  electronic: "Electronic",
  experimental: "Experimental",
  folk: "Folk/Country",
  global: "Global",
  jazz: "Jazz",
  metal: "Metal",
  pop: "Pop/R&B",
  rap: "Rap/Hip-Hop",
  rock: "Rock",
}

const dev = process.env.NODE_ENV === "development"

type GenreValues = Record<string, boolean>

function getInitialGenres(): Record<string, boolean> {
  return Object.fromEntries(Object.keys(genres).map((genre) => [genre, true]))
}

function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  genres: string[],
  minRating: number
) {
  const params = new URLSearchParams()
  genres.forEach((genre) => {
    params.append("genre", genre)
  })
  params.set("minRating", minRating.toString())

  return params.toString()
}

function areAnyGenresSelected(genreValues: GenreValues): boolean {
  // todo: we should have a simple genres string array at the top level
  const genres = Object.keys(genreValues)
  return genres.findIndex((genre) => !!genreValues[genre]) !== -1
}

function areAllGenresSelected(genreValues: GenreValues): boolean {
  const genres = Object.keys(genreValues)
  return genres.findIndex((genre) => !genreValues[genre]) === -1
}

export default function OptionsModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedGenres, setSelectedGenres] = useState<GenreValues>(
    getInitialGenres()
  )
  const [rating, setRating] = useState<number>(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const getParametersFromUrl = useCallback(
    function () {
      const minRating: number = Number(searchParams.get("minRating"))
      const urlGenres = searchParams.getAll("genre")
      const genreValues = Object.fromEntries(
        Object.keys(genres).map((genre) => [genre, urlGenres.includes(genre)])
      )
      const nonNullGenreValues = areAnyGenresSelected(genreValues)
        ? genreValues
        : getInitialGenres()

      setRating(minRating)
      setSelectedGenres(nonNullGenreValues)
    },
    [searchParams]
  )

  useEffect(() => {
    getParametersFromUrl()
  }, [getParametersFromUrl])

  function handleSetGenres(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, checked } = target
    const newSelection = { ...selectedGenres }
    newSelection[value] = checked
    setSelectedGenres(newSelection)
  }

  function handleSetRating(event: Event, newValue: number | number[]) {
    setRating(newValue as number)
  }

  function handleCancel() {
    getParametersFromUrl()
    setOpen(false)
  }

  function handleSubmit() {
    const genres = areAllGenresSelected(selectedGenres)
      ? []
      : Object.keys(selectedGenres).filter((genre) => selectedGenres[genre])

    router.replace(
      pathname + "?" + createQueryString(searchParams, genres, rating)
    )
    setOpen(false)
  }

  return (
    <>
      {dev && (
        <Button variant="plain" color="neutral" onClick={() => setOpen(true)}>
          Menu
        </Button>
      )}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <Sheet className={styles.dialog}>
          <h3>Genres</h3>
          <ul className={styles.checkboxContainer}>
            {Object.keys(genres).map((genre) => (
              <ListItem key={genre}>
                <Checkbox
                  className={styles.checkbox}
                  color="neutral"
                  onChange={handleSetGenres}
                  label={genres[genre]}
                  value={genre}
                  checked={selectedGenres[genre]}
                />
              </ListItem>
            ))}
          </ul>

          <div className={styles.ratingWrapper}>
            <h3>Rating</h3>
            <div>
              <Slider
                step={0.1}
                value={rating}
                max={10}
                onChange={handleSetRating}
                color="neutral"
                track="inverted"
                size="sm"
                variant="solid"
              />
            </div>
            <div>{rating} – 10</div>
          </div>

          <div className={styles.buttonGroup}>
            <Button
              onClick={handleCancel}
              color="neutral"
              variant="plain"
              className="button"
            >
              Cancel
            </Button>
            <Button
              disabled={!areAnyGenresSelected(selectedGenres)}
              onClick={handleSubmit}
              color="neutral"
            >
              Filter
            </Button>
          </div>
        </Sheet>
      </Modal>
    </>
  )
}
