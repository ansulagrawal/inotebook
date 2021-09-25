const express = require('express');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser');
const Note = require('../modules/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1 :  Get All the Notes using: GET "/api/note/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
});

// ROUTE 2 :  Add a new Note using: POST "/api/note/addnote". Login required
router.post('/addnote', fetchuser, [

   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {

   try {
      const { title, description, tag } = req.body;
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);

      //If there are errors, return Bad request and the errors
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title, description, tag, user: req.user.id
      })
      const savedNote = await note.save()

      res.json(savedNote)
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
});

// ROUTE 3 :  Update an existing Note using: GET "/api/note/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      // Create a newNote object:
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to e updated
      let note = await Note.findById(req.params.id); // Find the Id of note that to be updated. 
      if (!note) { return res.status(404).send("Not Found") } //If its not same retun error 404

      // check the note user is same as login user
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
});
module.exports = router;