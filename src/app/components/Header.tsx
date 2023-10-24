"use client"
import { useState } from "react"
import styles from "./Header.module.css"
import OptionsModal from "./OptionsModal"

export default function Header({ text = "" }) {
  return (
    <nav className={styles.wrapper}>
      <div style={{ width: 200 }}>
        <a href="/">Forker</a> {text}
      </div>

      <OptionsModal />
    </nav>
  )
}
