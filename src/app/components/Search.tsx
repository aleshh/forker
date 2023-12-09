"use client"
import { useState, useRef, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import { IoSearch } from "react-icons/io5"
import styles from "./OptionsModal.module.css"
import Modal from "@mui/joy/Modal"
import Sheet from "@mui/joy/Sheet"
import Input from "@mui/joy/Input"
import Button from "./Button"

export default function Search() {
  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  function handleOpen() {
    setOpen(true)

    // this is horrible. https://github.com/mui/material-ui/issues/1594
    setTimeout(() => {
      if (inputRef.current !== null) {
        inputRef.current.focus()
      }
    }, 0)
  }

  function handleSubmit(e: SyntheticEvent): void {
    const target = e.target as typeof e.target & {
      search: { value: string }
    }
    const searchValue = target.search.value

    router.replace("/search/" + searchValue)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>
        <IoSearch />
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <Sheet className={styles.dialog}>
          <form onSubmit={handleSubmit}>
            <Input
              slotProps={{
                input: {
                  ref: inputRef,
                },
              }}
              sx={{
                borderRadius: 0,
                padding: 0,
                "&:focus-within::before": {
                  boxShadow: "none",
                  borderBottom: "3px solid gray",
                },
              }}
              placeholder="Search by artist"
              name="search"
              autoFocus
              fullWidth
              variant="plain"
              size="lg"
            />
          </form>
        </Sheet>
      </Modal>
    </>
  )
}
