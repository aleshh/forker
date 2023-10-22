"use client"
import styles from "./Header.module.css"

export default function Header({ text = "" }) {
  return (
    <nav className={styles.wrapper}>
      <a href="/">Forker</a> {text}
    </nav>
  )
}
