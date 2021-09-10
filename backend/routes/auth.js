const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". Doesn't require auth
router.post('/', [

   // name must be at least 3 chars long
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   // email must be an email
   body('email', 'Enter a valid email').isEmail(),
   // password must be at least 8 chars long
   body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),

], (req, res) => {

   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   // else {
   //    const user = User(req.body);
   //    user.save();
   //    res.send(req.body)
   // }
   User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   }).then(user => res.json(user))
      .catch(err => {
         console.log(err)
         res.json({ error: 'Please enter a unique email-id' })
      })

})

module.exports = router