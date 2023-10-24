import { useState, ChangeEvent } from "react"
// eslint-disable-next-line no-unused-vars
import Button from "@mui/joy/Button"
import Modal from "@mui/joy/Modal"
import ModalClose from "@mui/joy/ModalClose"
import Slider from "@mui/joy/Slider"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"

// https://mui.com/joy-ui/react-slider/

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

function getInitialGenres(): Record<string, boolean> {
  return Object.fromEntries(Object.keys(genres).map((genre) => [genre, true]))
}

function Genres() {
  const [selected, setSelected] = useState(getInitialGenres())

  function handleChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, checked } = target
    const newSelection = { ...selected }
    newSelection[value] = checked
    setSelected(newSelection)
  }

  return (
    <List>
      {Object.keys(genres).map((genre) => (
        <ListItem key={genre}>
          <Checkbox
            onChange={handleChange}
            label={genres[genre]}
            value={genre}
            checked={selected[genre]}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default function OptionsModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [rating, setRating] = useState<number>(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue)
    setRating(newValue as number)
  }
  return (
    <>
      {/* <Button variant="plain" color="neutral" onClick={() => setOpen(true)}>
        Menu
      </Button> */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Genres />

          <div>
            <div>Rating</div>
            <div style={{ width: 200 }}>
              <Slider
                step={0.1}
                value={rating}
                max={10}
                onChange={handleChange}
                color="neutral"
                track="inverted"
                size="sm"
                variant="solid"
              />
            </div>
            <div>{rating} – 10</div>
          </div>
        </Sheet>
      </Modal>
    </>
  )
}
