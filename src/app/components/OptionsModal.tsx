"use client"
import { useCallback, useEffect, useState, ChangeEvent } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { IoFilterSharp } from "react-icons/io5"
import styles from "./OptionsModal.module.css"
import Button from "@mui/joy/Button"
import Modal from "@mui/joy/Modal"
import Slider from "@mui/joy/Slider"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import ListItem from "@mui/joy/ListItem"
import { genres, Genre, GenreValues, GenreNames } from "../types"

// todo: sort out types in this file: remove `as` and ts-ignore

const bottomPadding = { marginBottom: 16 }

// todo: make this generic, put in utils, and use also in api calls
function createQueryString(genres: string[], minRating: number) {
  const params = new URLSearchParams()
  genres.forEach((genre) => {
    params.append("genre", genre)
  })
  params.set("minRating", minRating.toString())

  return params.toString()
}

function getAllGenresSelected(): GenreValues {
  return Object.fromEntries(genres.map((genre) => [genre, true])) as GenreValues
}
function getNoGenresSelected(): GenreValues {
  return Object.fromEntries(
    genres.map((genre) => [genre, false])
  ) as GenreValues
}

function areAnyGenresSelected(genreValues: GenreValues): boolean {
  return genres.findIndex((genre) => !!genreValues[genre]) !== -1
}

function areAllGenresSelected(genreValues: GenreValues): boolean {
  return genres.findIndex((genre) => !genreValues[genre]) === -1
}

export default function OptionsModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedGenres, setSelectedGenres] = useState<GenreValues>(
    getAllGenresSelected()
  )
  const [rating, setRating] = useState<number>(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const getParametersFromUrl = useCallback(
    function () {
      const minRating: number = Number(searchParams.get("minRating"))
      const urlGenres = searchParams.getAll("genre")
      const genreValues: GenreValues = Object.fromEntries(
        Object.keys(GenreNames).map((genre) => [
          genre,
          urlGenres.includes(genre),
        ])
      ) as GenreValues
      const nonNullGenreValues = areAnyGenresSelected(genreValues)
        ? genreValues
        : getAllGenresSelected()

      setRating(minRating)
      setSelectedGenres(nonNullGenreValues)
    },
    [searchParams]
  )

  useEffect(() => {
    getParametersFromUrl()
  }, [getParametersFromUrl])

  function handleSelectAll() {
    if (areAllGenresSelected(selectedGenres)) {
      setSelectedGenres(getNoGenresSelected())
    } else {
      setSelectedGenres(getAllGenresSelected())
    }
  }

  function handleSetGenres(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, checked } = target
    const newSelection = { ...selectedGenres }
    //@ts-ignore
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
      : //@ts-ignore
        Object.keys(selectedGenres).filter((genre) => selectedGenres[genre])

    router.replace(pathname + "?" + createQueryString(genres, rating))
    setOpen(false)
  }

  return (
    <>
      <Button variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <IoFilterSharp />
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <Sheet className={styles.dialog}>
          <h3 style={bottomPadding}>Genres</h3>
          <Checkbox
            checked={areAllGenresSelected(selectedGenres)}
            indeterminate={
              !areAllGenresSelected(selectedGenres) &&
              areAnyGenresSelected(selectedGenres)
            }
            label="Select all"
            onChange={handleSelectAll}
            style={bottomPadding}
          />
          <ul className={styles.checkboxContainer}>
            {Object.keys(GenreNames).map((genre) => (
              <ListItem key={genre}>
                <Checkbox
                  className={styles.checkbox}
                  color="neutral"
                  onChange={handleSetGenres}
                  label={GenreNames[genre as Genre]}
                  value={genre}
                  checked={selectedGenres[genre as Genre]}
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
            >
              Filter
            </Button>
          </div>
        </Sheet>
      </Modal>
    </>
  )
}
