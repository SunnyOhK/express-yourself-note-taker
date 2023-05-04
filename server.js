const express = require('express');
const path = require('path');
const fs = require('fs');
// Created fxn in helpers folder to create ID for each note
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

//* ----------- MIDDLEWARE ----------- *//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


//* ----------- GET ----------- *//
// GET request for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes, send msg to client, log to terminal
app.get('/api/notes', (req, res) => {
  res.status(200).json(`${req.method} request received to get notes`);
  console.log(`${req.method} request received to get notes`);
});

//* ----------- POST ----------- *//
// POST request to add a note, log request receipt, destructure items
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    // Create new note with title, text, and a unique id
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // Obtain existing list of notes and add/push new note
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);

        // Write new note to file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});


app.listen(PORT, () => console.log(`App listening on port ${PORT} 🚀`));