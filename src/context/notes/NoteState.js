import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
   const s1 = {
      "name": "Ansul",
      "class": "10b"
   }
   const [state, setState] = useState(s1)

   const update = () => {
      setTimeout(() => {
         setState({
            "name": "Ansul Agrawal",
            "class": "10a"
         })
      }, 1000);
   }
   return (
      <NoteContext.Provider value={{ state, update }}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;