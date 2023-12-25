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

  const onDeleteNote = (id: number | undefined) => {
    const url = "http://localhost:3000/notes"

    const deleteData = async () => {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to delete note")
        }

        console.log("Note deleted")
      } catch (error) {
        console.error("Error on delete note:", error)
      }
    }

    deleteData()
  }

  return (
    <section className="notes-list">
      {notes.map((note: Note) => {
        return <Note key={note.id} {...note} onDeleteNote={onDeleteNote} />
      })}
    </section>
  )
}

export default NotesList
