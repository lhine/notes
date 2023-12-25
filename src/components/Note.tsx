import "../styles/Note.css"

type NoteProps = {
  title: string
  content: string
  color: string
}

const Note = ({ title, content, color }: NoteProps) => {
  return (
    <div className={`note note--${color}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

export default Note
