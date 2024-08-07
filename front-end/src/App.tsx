import { NotesList } from "./components/NotesList"

export function App() {
  return (
    <>
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold">Notes</h1>
        <NotesList />
      </div>
    </>
  )
}

