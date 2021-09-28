import React from 'react'
const NoteItem = (props) => {
   const { note } = props;
   return (
      <div className="col-md-3">
         <div className="card text-dark bg-light mb-3" >
            <div className="card-body">
               <h5 className="card-title">{note.title}</h5>
               <p className="card-text">{note.description}</p>
               <div className="d-flex justify-content-between">
                  <i className="fas fa-trash-alt"></i>
                  <i className="fas fa-edit"></i>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NoteItem;
