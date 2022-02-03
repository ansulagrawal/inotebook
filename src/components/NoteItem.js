import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
   const context = useContext(NoteContext);
   const { deleteNote } = context;
   const { note, updateNote } = props;
   return (
      <div className='col-md-3'>
         <div className='card text-dark bg-light mb-3'>
            <div className='card-body'>
               <h5 className='card-title'>{note.title}</h5>
               <p className='card-text'>
                  <strong>Description:</strong>
                  {note.description}
               </p>
               <p className='cart-text'>
                  <strong>Tag:</strong>
                  {note.tag}
               </p>
               <div className='d-flex justify-content-between'>
                  <i
                     className='fas fa-trash-alt'
                     onClick={() => {
                        deleteNote(note._id);
                        props.showAlert('Note deleted sucessfully', 'success');
                     }}
                  ></i>
                  <i
                     className='fas fa-edit'
                     onClick={() => {
                        updateNote(note);
                     }}
                  ></i>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NoteItem;
