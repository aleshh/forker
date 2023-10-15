import BounceLoader from "react-spinners/BounceLoader"

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
      <BounceLoader color="rgba(222, 0, 0, 1)" size={100} />
    </div>
  )
}
