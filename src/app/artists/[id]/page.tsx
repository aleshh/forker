export default function Artist({ params }: { params: { id: string } }) {
  return <h1>Artist: {params.id}</h1>
}
