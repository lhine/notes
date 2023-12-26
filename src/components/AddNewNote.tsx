import { useState } from "react"
import "../styles/AddNewNote.css"

const AddNewNote = () => {
  const emptyNote: Note = {
    title: "",
    content: "",
    color: "default",
  }
  const [newNote, setNewNote] = useState<Note>(emptyNote)

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote((prevNote) => ({ ...prevNote, title: e.target.value }))
  }

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote((prevNote) => ({ ...prevNote, content: e.target.value }))
  }

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewNote((prevNote) => ({ ...prevNote, color: e.target.value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const BASE_URL = "http://localhost:3000/notes"

    const postNote = async () => {
      try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        })

        if (!response.ok) {
          throw new Error("Failed to create note")
        }

        const createdNote = await response.json()
        console.log("Created a new note:", createdNote)

        setNewNote(emptyNote)
      } catch (error) {
        console.error("error", error)
      }
    }

    postNote()
  }

  return (
    <section className="add-new-note">
      <form onSubmit={handleFormSubmit}>
        <select name="color" value={newNote.color} onChange={handleChangeColor}>
          <option value="">default</option>
          <option value="blue">blue</option>
          <option value="green">green</option>
        </select>

        <input
          name="title"
          type="text"
          value={newNote.title}
          onChange={handleChangeTitle}
        />

        <textarea
          name="content"
          value={newNote.content}
          onChange={handleChangeContent}
        ></textarea>

        <button type="submit">create new note</button>
      </form>
    </section>
  )
}
export default AddNewNote
