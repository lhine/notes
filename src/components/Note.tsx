import "../styles/Note.css"

const Note = ({ title, content, color }: Note) => {
  return (
    <div className={`note note--${color}`}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

export default Note
