import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

   const notesInitial = [
      {
         "_id": "614dbe546574cb7b81a05e7f",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:02:28.628Z",
         "__v": 0
      },
      {
         "_id": "614dbead6574cb7b81a05e81",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:03:57.097Z",
         "__v": 0
      },
      {
         "_id": "614dbead6574cb7b81a05e83",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:03:57.209Z",
         "__v": 0
      },
      {
         "_id": "614dbead6574cb7b81a05e85",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:03:57.302Z",
         "__v": 0
      },
      {
         "_id": "614dbead6574cb7b81a05e87",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:03:57.641Z",
         "__v": 0
      },
      {
         "_id": "614dbead6574cb7b81a05e89",
         "user": "613f37c1733e6c1611e984e0",
         "title": "My Title",
         "description": "Please wakeup early",
         "tag": "personal",
         "date": "2021-09-24T12:03:57.866Z",
         "__v": 0
      }
   ]
   const [notes, setNotes] = useState(notesInitial);

   //Add a Note:
   const addNote = (title, description, tag) => {
      // TODO Api Calls
      console.log("adding a new note");
      const note = {
         "_id": "614dbead6574cb7b81a15f7",
         "user": "613f37c1733e6c1611e984e0",
         "title": title,
         "description": description,
         "tag": tag,
         "date": "2021-09-24T12:03:57.866Z",
         "__v": 0
      };
      // console.log(note);
      // setNotes(notes.push(note))
      setNotes(notes.concat(note))

   }

   // Delete a Note:
   const deleteNote = (id) => {
      // TODO Api Calls
      console.log("Deleting a note with id" + id);
      const newNote = notes.filter((notes) => { return (notes._id !== id) })
      setNotes(newNote)
   }

   // Edit a note:
   const editNote = () => {

   }

   return (
      <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;