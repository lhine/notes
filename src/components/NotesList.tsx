import { useEffect, useState } from "react"
import Note from "./Note"
import "../styles/NotesList.css"

const NotesList = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const url = "http://localhost:3000/notes"

    const getData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        setNotes(json)
      } catch (error) {
        console.error("error", error)
      }
    }

    getData()
  }, [notes])

  return (
    <section className="notes-list">
      {notes.map((note: Note) => {
        return <Note key={note.id} {...note} />
      })}
    </section>
  )
}

export default NotesList
