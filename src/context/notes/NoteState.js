import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

   const host = "http://localhost:5000"
   const notesInitial = []
   const [notes, setNotes] = useState(notesInitial)

   // Get all Note:
   const getNotes = async () => {
      //  Api Calls
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM3YzE3MzNlNmMxNjExZTk4NGUwIn0sImlhdCI6MTYzMjkwODgxMH0.c20i6cqMQng5rY6JhIw2wQoJ4BLrSZXo05I2V1R6EJA'
         },
      });
      const json = await response.json()

      // Logic in the client 

      console.log(json);
      setNotes(json)
      // setNotes(notes.push(note))
      // setNotes(notes.concat(note))
   }

   //Add a Note:
   const addNote = async (title, description, tag) => {
      //  Api Calls
      const response = await fetch(`${host}/api/notes/addnote`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM3YzE3MzNlNmMxNjExZTk4NGUwIn0sImlhdCI6MTYzMjkwODgxMH0.c20i6cqMQng5rY6JhIw2wQoJ4BLrSZXo05I2V1R6EJA'
         },
         body: JSON.stringify({ title, description, tag })
      });
      const json = response.json();
      console.log(json)

      // TODO:Logic in the client 
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
   const deleteNote = async (id) => {
      // TODO Api Calls
      const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM3YzE3MzNlNmMxNjExZTk4NGUwIn0sImlhdCI6MTYzMjkwODgxMH0.c20i6cqMQng5rY6JhIw2wQoJ4BLrSZXo05I2V1R6EJA'
         }
      });
      const json = response.json();
      console.log(json)


      console.log("Deleting a note with id" + id);
      const newNote = notes.filter((notes) => { return (notes._id !== id) })
      setNotes(newNote)
   }

   // Edit a note:
   const editNote = async (id, title, description, tag) => {
      console.log(id, title, description, tag)
      // TODO:Api Calls
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZjM3YzE3MzNlNmMxNjExZTk4NGUwIn0sImlhdCI6MTYzMjkwODgxMH0.c20i6cqMQng5rY6JhIw2wQoJ4BLrSZXo05I2V1R6EJA'
         },
         body: JSON.stringify({ title, description, tag })
      });
      const json = response.json();
      console.log(json)

      // TODO: Logic to edit in the client
      let newNote = JSON.parse(JSON.stringify(notes))
      for (let i = 0; i < newNote.length; i++) {
         const element = newNote[i];
         if (element._id === id) {
            newNote[i].title = title;
            newNote[i].description = description;
            newNote[i].tag = tag;
            break;
         }
      }
      setNotes(newNote);
   }

   return (
      <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;