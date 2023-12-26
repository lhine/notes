import { useEffect, useState } from "react"
import Note from "./Note"
import "../styles/NotesList.css"

const NotesList = () => {
  const [error, setError] = useState<unknown>()
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const BASE_URL = "http://localhost:3000/notes"

    const fetchNotes = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(BASE_URL)
        const notes = (await response.json()) as Note[]
        setNotes(notes)
      } catch (error: unknown) {
        setError(error)
      } finally {
        setIsLoading(false)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong.</div>
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
