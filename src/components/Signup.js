import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
   const host = 'https://guarded-river-86367.herokuapp.com';
   const [credentials, setCredentials] = useState({
      name: '',
      email: '',
      password: '',
      cpassword: '',
   });
   let history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createuser`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
         }),
      });
      const json = await response.json();
      console.log(json.errors);
      if (json.sucess) {
         //save the auth token and redirect
         localStorage.setItem('token', json.authtoken);
         history.push('/');
         props.showAlert('Account Created Sucessfully', 'success');
      } else {
         props.showAlert(json.error, 'danger');
      }
   };

   const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
   };

   return (
      <div className='container'>
         <form onSubmit={handleSubmit}>
            <div className='mb-3'>
               <label htmlFor='name' className='form-label'>
                  Name
               </label>
               <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={credentials.name}
                  onChange={onChange}
                  aria-describedby='nameHelp'
               />
            </div>
            <div className='mb-3'>
               <label htmlFor='email' className='form-label'>
                  Email address
               </label>
               <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={credentials.email}
                  onChange={onChange}
                  aria-describedby='emailHelp'
               />
               <div id='emailHelp' className='form-text'>
                  We'll never share your email with anyone else.
               </div>
            </div>
            <div className='mb-3'>
               <label htmlFor='password' className='form-label'>
                  Password
               </label>
               <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={credentials.password}
                  onChange={onChange}
                  minLength={8}
                  required
               />
            </div>
            <div className='mb-3'>
               <label htmlFor='cpassword' className='form-label'>
                  Confirm Password
               </label>
               <input
                  type='password'
                  className='form-control'
                  id='cpassword'
                  name='cpassword'
                  minLength={8}
                  required
               />
            </div>
            <button type='submit' className='btn btn-primary'>
               Submit
            </button>
         </form>
      </div>
   );
};

export default Signup;
