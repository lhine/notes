interface NoteData {
  id: string
  title: string
  content: string
  tags:? string[]
}

interface TagData {
  id: string
  label: string
}