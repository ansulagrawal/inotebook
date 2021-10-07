const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Ansul$is$a$goo$d$bo$y'; // json webtoken Secret key value

// ROUTE 1 :  Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [

   // name must be at least 3 chars long
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   // email must be an email
   body('email', 'Enter a valid email').isEmail(),
   // password must be at least 8 chars long
   body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   let sucess = false;
   //If there are errors, return Bad request and the errors
   if (!errors.isEmpty()) {
      return res.status(400).json({ sucess, errors: errors.array() });
   }

   // else {
   //    const user = User(req.body);
   //    user.save();
   //    res.send(req.body)
   // }

   try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user)
      // Check weather user with this email exists already returen error
      if (user) {
         return res.status(400).json({ sucess, error: "Sorry a user with this email already exists" })
      }

      // Creating a salt for Password Protection:
      const salt = await bcrypt.genSalt(10);

      //Seting a password with the salt and has function
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new User
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      });

      // .then(user => res.json(user))
      // .catch(err => {
      //    console.log(err)
      //    res.json({ error: 'Please enter a unique email-id', message: err.message })
      // })

      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);
      sucess = "true";
      // res.json(user);
      res.json({ sucess, authtoken });

   } catch (error) {
      console.log(error.message);
      res.status(500).send(sucess, "Internal Server Error");
   }
})

// ROUTE 2:  Authenticate a user using : POST "/api/auth/login". No login required
router.post('/login', [

   // email must be an email
   body('email', 'Enter a valid email').isEmail(),
   // password must be at least 8 chars long
   body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   let sucess = false;
   //If there are errors, return Bad request and the errors
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   // taking email and password from the body which is send by user.
   const { email, password } = req.body;

   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Please try to login with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         return res.status(400).json({ sucess, error: "Please try to login with correct credentials." });
      }

      const data = {
         user: {
            id: user.id
         }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authtoken });

   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
});


// ROUTE 3: Get Loggedin User Details using POST  "/api/auth/getuser". Login Required!
router.post('/getuser', fetchuser, async (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
