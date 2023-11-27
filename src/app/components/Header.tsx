"use client"
import useSearchParamsString from "../utils/useSearchParamsString"
import styles from "./Header.module.css"
import Search from "./Search"
import OptionsModal from "./OptionsModal"

export default function Header({
  pageType = "",
  pageName = "",
}: {
  pageType?: string
  pageName?: string
}) {
  const searchParamsString = useSearchParamsString()
  const showBreadcrumbs = !!(pageType && pageName)

  const titleClass = showBreadcrumbs
    ? styles.appNameWithBreadcrumbs
    : styles.appName

  return (
    <nav className={styles.wrapper}>
      <div className={styles.breadCrumbs}>
        <a href={`/${searchParamsString}`} className={titleClass}>
          Forker
        </a>
        {showBreadcrumbs && `${pageType} → ${pageName}`}
      </div>
      <Search />
      <OptionsModal />
    </nav>
  )
}
