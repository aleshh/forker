import { useEffect, useState } from "react"
import usePageVisibility from "./usePageVisibility"

function getCurrentDate() {
  const d = new Date()
  return `${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`
}

/**
 * Returns true when (1) visibility has just returned to "visible" from "hidden"
 * and (2) date is different from current date.
 */
export default function useShouldReset() {
  const [date, setDate] = useState(getCurrentDate())
  const [previousVisibility, setPreviousVisibility] = useState("visible")
  const currentVisibility = usePageVisibility()

  const checkableVisibility = previousVisibility
  if (currentVisibility !== previousVisibility) {
    setPreviousVisibility(currentVisibility)
  }

  // console.log(
  //   getCurrentDate() === date,
  //   checkableVisibility === currentVisibility,
  //   currentVisibility === "hidden"
  // )

  if (checkableVisibility === currentVisibility) return false
  if (currentVisibility === "hidden") return false
  if (getCurrentDate() === date) return false

  setDate(getCurrentDate())
  return true
}
