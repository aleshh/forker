"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import Slider from "@mui/joy/Slider"
import styles from "./Header.module.css"

// https://mui.com/joy-ui/react-slider/

export default function Header({ text = "" }) {
  const [rating, setRating] = useState(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue)
    setRating(newValue as number)
  }

  return (
    <nav className={styles.wrapper}>
      <div style={{ width: 200 }}>
        <a href="/">Forker</a> {text}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
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
    </nav>
  )
}
