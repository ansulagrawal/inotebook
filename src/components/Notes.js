import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = (props) => {
   const context = useContext(NoteContext);
   const { notes, getNotes, editNote } = context;
   let history = useHistory();

   useEffect(() => {
      if (localStorage.getItem('token')) {
         getNotes();
      } else {
         history.push('/login');
      }
      // eslint-disable-next-line
   }, []);

   const ref = useRef(null);
   const [note, setNote] = useState({
      id: '',
      etitle: '',
      edescription: '',
      etag: '',
   });

   const updateNote = (currentNote) => {
      ref.current.click();
      setNote({
         id: currentNote._id,
         etitle: currentNote.title,
         edescription: currentNote.description,
         etag: currentNote.tag,
      });
   };

   const handleClick = (e) => {
      // console.log("Updating the note...", note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
      e.preventDefault();
      props.showAlert('Note updated sucessfully', 'success');
   };

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
   };
   return (
      <>
         <AddNote showAlert={props.showAlert} />
         <button
            ref={ref}
            type='button'
            className='btn btn-primary d-none'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
         >
            Launch demo modal
         </button>
         {/* Modal  */}
         <div
            className='modal fade'
            id='staticBackdrop'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabIndex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
         >
            <div className='modal-dialog'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <h5 className='modal-title' id='staticBackdropLabel'>
                        Edit Note
                     </h5>
                     <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                     ></button>
                  </div>
                  <div className='modal-body'>
                     <form>
                        <div className='mb-3'>
                           <label htmlFor='etitle' className='form-label'>
                              Title
                           </label>
                           <input
                              type='text'
                              className='form-control'
                              id='etitle'
                              name='etitle'
                              value={note.etitle}
                              onChange={onChange}
                              minLength={5}
                              required
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor='edescription' className='form-label'>
                              Description
                           </label>
                           <input
                              type='text'
                              className='form-control'
                              id='edescription'
                              name='edescription'
                              value={note.edescription}
                              onChange={onChange}
                              minLength={5}
                              required
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor='etag' className='form-label'>
                              Tag
                           </label>
                           <input
                              type='text'
                              className='form-control'
                              id='etag'
                              name='etag'
                              value={note.etag}
                              onChange={onChange}
                              minLength={2}
                              required
                           />
                        </div>
                     </form>
                  </div>
                  <div className='modal-footer'>
                     <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                     >
                        Close
                     </button>
                     <button
                        disabled={
                           note.etitle.length < 5 ||
                           note.edescription.length < 5 ||
                           note.etag.length < 2
                        }
                        type='button'
                        className='btn btn-primary'
                        data-bs-dismiss='modal'
                        onClick={handleClick}
                     >
                        Update Node
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className='ms-1 row'>
            <h2>Your Notes</h2>
            <div className='container text-center fs-3 fw-light'>
               {notes.length === 0 && 'No notes to Display!'}
            </div>
            {notes.map((note) => {
               return (
                  <NoteItem
                     key={note._id}
                     note={note}
                     updateNote={updateNote}
                     showAlert={props.showAlert}
                  />
               );
            })}
         </div>
      </>
   );
};

export default Notes;
