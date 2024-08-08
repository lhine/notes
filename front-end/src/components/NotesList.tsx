import { useEffect, useState } from 'react'
import axios from 'axios'
import { NOTES, TAGS } from '../services'
import { Note } from './Note'


export function NotesList() {
  const [notes, setNotes] = useState<NoteData[]>([])
  const [tags, setTags] = useState<TagData[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>(["1", "2"])

  const notesToDisplay = tags.length ?
    notes.filter(note => selectedTags.some(tag => note.tags && note.tags.includes(tag))) : notes;

  const handleTagClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

    const tagId = e.currentTarget.id
    const index = selectedTags.indexOf(tagId)

    index !== -1 ?
      setSelectedTags(selectedTags.splice(index, 1)) :
      setSelectedTags([...selectedTags, tagId])
  }

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<TagData[]>(TAGS.GET_ALL);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get<NoteData[]>(NOTES.GET_ALL);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchTags();
    fetchNotes();
  }, []);

  return (
    <>
      <div>
        {tags.map((tag) => (
          <a key={tag.id} id={tag.id} onClick={handleTagClick}> {tag.label} </a>
        ))}
      </div>

      <section>
        {notesToDisplay.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </section>
    </>
  )
}

