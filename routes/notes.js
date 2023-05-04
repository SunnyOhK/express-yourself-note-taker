// helper fxns and dependencies
const app = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//* ----------- GET ----------- *//
// GET Route for retrieving notes
app.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//* ----------- POST ----------- *//
// POST Route for new note
app.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    // const response = {
    //   status: 'success',
    //   body: newNote,
    // };
    res.json(`Note added successfully. 🚀`);
  } else {
    res.error('Error in adding note.');
  }
});

module.exports = app;
