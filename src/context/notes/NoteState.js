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

   return (
      <NoteContext.Provider value={{ notes, setNotes }}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;