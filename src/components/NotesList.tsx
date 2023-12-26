import { useEffect, useState } from "react"
import Note from "./Note"
import "../styles/NotesList.css"

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const BASE_URL = "http://localhost:3000/notes"

    const fetchNotes = async () => {
      try {
        const response = await fetch(BASE_URL)
        const notes = (await response.json()) as Note[]
        setNotes(notes)
      } catch (error) {
        console.error("error", error)
      }
    }

    fetchNotes()
  }, [notes])

  const onDeleteNote = (id: number | undefined) => {
    const BASE_URL = "http://localhost:3000/notes"

    const deleteNote = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${id}`, {
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

    deleteNote()
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
