import React from 'react';

const Alert = (props) => {
   return (
      <div style={{ height: '50px' }}>
         {props.alert && (
            <div
               className={`alert alert-${props.alert.type} alert-dismissible fade show`}
               role='alert'
            >
               <strong>
                  {props.alert.type === 'danger' ? 'Error' : 'Success '}
               </strong>
               : {props.alert.msg ? props.alert.msg : 'Invalid details'}
            </div>
         )}
      </div>
   );
};

export default Alert;
