import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
   const context = useContext(NoteContext);
   const { addNote } = context;

   const [note, setNote] = useState({ title: '', description: '', tag: '' });

   const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({ title: '', description: '', tag: '' });
      props.showAlert('Note added sucessfully', 'success');
   };

   const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
   };

   return (
      <>
         <div className='container'>
            <h2>Add a Note</h2>
            <form>
               <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                     Title
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     id='title'
                     name='title'
                     placeholder='Enter your title   min:5 length'
                     value={note.title}
                     onChange={onChange}
                     minLength={5}
                     required
                  />
               </div>
               <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                     Description
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     id='description'
                     name='description'
                     placeholder='description    min:5 length'
                     value={note.description}
                     onChange={onChange}
                     minLength={5}
                     required
                  />
               </div>
               <div className='mb-3'>
                  <label htmlFor='tag' className='form-label'>
                     Tag
                  </label>
                  <input
                     type='text'
                     className='form-control'
                     id='tag'
                     name='tag'
                     placeholder='eg: personal, Office, ...    min:2 length'
                     value={note.tag}
                     onChange={onChange}
                     minLength={2}
                     required
                  />
               </div>
               <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={
                     note.title.length < 5 ||
                     note.description.length < 5 ||
                     note.tag.length < 2
                  }
                  onClick={handleClick}
               >
                  Add Note
               </button>
            </form>
         </div>
      </>
   );
};

export default AddNote;
