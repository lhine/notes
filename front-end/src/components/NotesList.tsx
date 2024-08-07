import { useEffect, useState } from 'react'
import axios from 'axios'
import { NOTES } from '../services'
import { Note } from './Note'


export function NotesList() {
  const [notes, setNotes] = useState<NoteData[]>([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<NoteData[]>(NOTES.GET_ALL);
        setNotes(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <section>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </section>
  )
}