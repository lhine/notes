import { useEffect, useState } from "react"
import Note from "./Note"
import "../styles/NotesList.css"

const NotesList = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const url = "http://localhost:3000/notes"

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        setNotes(json)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="notes-list">
      {notes.map((note: Note) => {
        return <Note key={note.id} {...note} />
      })}
    </div>
  )
}

export default NotesList
