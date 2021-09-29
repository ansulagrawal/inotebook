import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = () => {
   const context = useContext(NoteContext);
   const { notes, getNotes } = context;


   useEffect(() => {
      getNotes()
      // eslint-disable-next-line
   }, [])

   const ref = useRef(null)
   const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

   const updateNote = (currentNote) => {
      ref.current.click();
      setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
   }

   const handleClick = (e) => {
      console.log("Updating the note...", note)
      e.preventDefault();
   }

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
   }
   return (
      <>
         <AddNote />
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch demo modal
         </button>
         {/* Modal  */}
         <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="mb-3">
                           <label htmlFor="etitle" className="form-label">Title</label>
                           <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="edescription" className="form-label">Description</label>
                           <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="etag" className="form-label">Tag</label>
                           <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Update Node</button>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <h2>Your Notes</h2>
            {notes.map((note) => {
               return (<NoteItem key={note._id} note={note} updateNote={updateNote} />)
            })}
         </div>
      </>
   )
}

export default Notes;
