"use client"
import styles from "./Header.module.css"
import OptionsModal from "./OptionsModal"

export default function Header({
  pageType = "",
  pageName = "",
}: {
  pageType?: string
  pageName?: string
}) {
  const showBreadcrumbs = !!(pageType && pageName)

  const titleClass = showBreadcrumbs
    ? styles.appNameWithBreadcrumbs
    : styles.appName

  return (
    <nav className={styles.wrapper}>
      <div className={styles.breadCrumbs}>
        <a href="/" className={titleClass}>
          Forker
        </a>
        {showBreadcrumbs && `${pageType} → ${pageName}`}
      </div>
      <OptionsModal />
    </nav>
  )
}
