"use client"
// import { FiShare, FiCopy } from "react-icons/fi"
import styles from "./Header.module.css"

function restoreSpaces(str: string): string {
  return str.replaceAll("-", " ")
}

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}
function getLocationString(): undefined | string[] {
  if (!window) return
  return window?.location?.pathname
    .split("/")
    .filter((item) => item.length > 0)
    .map(restoreSpaces)
    .map(titleCase)
}

export default function Header() {
  const path = getLocationString()

  const location =
    path && path.length && path.length > 0 ? ` > ${path.join(" > ")}` : ""

  return (
    <nav className={styles.wrapper}>
      <a href="/">Forker</a> {location}
    </nav>
  )
}
