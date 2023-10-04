import { useEffect, useState } from "react"
import usePageVisibility from "./usePageVisibility"

export default function useShouldReset() {
  const [previousVisibility, setPreviousVisibility] = useState("visible")
  const visibility = usePageVisibility()

  const date = new Date()
  // console.log(date.getTime())
}
