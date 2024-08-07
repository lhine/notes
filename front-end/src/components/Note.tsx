interface NotesProps {
  note: NoteData
}

export function Note({ note }: NotesProps) {
  const { title, content } = note

  return (
    <div className="m-4 p-4 border border-slate-400">
      <h3>{title}</h3>
      <p>
        {content}
      </p>
    </div>
  )
}