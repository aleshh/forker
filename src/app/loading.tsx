"use client"
// https://www.davidhu.io/react-spinners/
import LoaderComponent from "react-spinners/DotLoader"

const wrapperStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export default function Loader() {
  return (
    <div style={wrapperStyle}>
      <LoaderComponent color="rgba(222, 0, 0, 1)" size={100} />
    </div>
  )
}
