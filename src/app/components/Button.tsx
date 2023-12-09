"use client"
import { ReactNode } from "react"
import styles from "./Button.module.css"

export default function Button(props: {
  children: ReactNode
  href?: string
  onClick?: () => void
}) {
  if (props.href) {
    return <a className={styles.button} target="_blank" {...props} />
  }
  if (props.onClick) {
    return <button className={styles.button} {...props} />
  }
  // todo: we should use TypeScript features to require either href or onClick
  throw new Error("Button requires either onClick or href.")
}
