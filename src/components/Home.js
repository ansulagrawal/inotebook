import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
const Home = () => {
   const context = useContext(NoteContext);
   const { notes, setNotes } = context;
   return (
      <>
         <div className="container">
            <h2>Add a Note</h2>
            <div className="mb-3">
               <label for="exampleFormControlInput1" className="form-label">Email address</label>
               <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
               <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
               <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
         </div>
         <div className="container">
            <h2>Your Notes</h2>
            {notes.map((note) => {
               return note.title;
            })}
         </div>
      </ >
   )
}

export default Home
