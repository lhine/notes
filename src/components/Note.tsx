import "../styles/Note.css"

interface NoteProps extends Note {
  onDeleteNote: (id: number | undefined) => void
}

const Note = ({ id, title, content, color, onDeleteNote }: NoteProps) => {
  const handleDeleteNote = () => {
    onDeleteNote(id)
  }

  return (
    <div className={`note note--${color}`}>
      <div className="note__wrapper">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>

      <div className="note__actions">
        <button name="delete-note" onClick={handleDeleteNote}>
          delete
        </button>
      </div>
    </div>
  )
}

export default Note
