"use client"
import { useSearchParams } from "next/navigation"

export default function useSearchParamsString() {
  const searchParamsString = useSearchParams().toString()
  return searchParamsString ? `?${searchParamsString}` : ""

  // const hasWindow = typeof window !== "undefined"
  // return hasWindow ? `?${window.location.search}` : ""
}
