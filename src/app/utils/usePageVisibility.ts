import { useEffect, useState } from "react"

export default function usePageVisibility() {
  const [state, setState] = useState("")

  function onVisibilityChange() {
    setState(document.visibilityState)
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", onVisibilityChange)

    return function () {
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return state
}
