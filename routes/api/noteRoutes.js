// helper fxns and dependencies
const router = require('express').Router();
const uuid = require('../../helpers/uuid');

// use functions defined as part of fs promises to read and write to the file
const {readFile, writeFile} = require('fs/promises');

// ASYNC/ AWAIT: simplified code after working with tutor to better understand the async function
// await will pause the execution of the subsequent function until the overarching promise has been delivered

// const data will be defined once readFile returns the contents of the notes.json file in a readable format (utf-8)
//* Tutor explained the try/catch block, but I asked Chat GPT to explain it in plain English: 'This prevents the error from crashing the entire program and allows us to handle it in a more controlled manner.' --> it basically is just cleaner than calling another function with .then/ .catch

const readData = async () =>{
  try {
    const data = await readFile("./db/notes.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
} 

//* ----------- GET ----------- *//
// GET Route for retrieving notes
router.get('/', async (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(await readData())
});

//* ----------- POST ----------- *//
// POST Route for new note
router.post('/', async (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    var currentNotes = await readData()
    currentNotes.push(newNote)
    await writeFile("./db/notes.json", JSON.stringify(currentNotes))
    res.json({
      message: 'Successfully wrote your note!'})
    console.info(`Your new note has been posted!`);

  } else {
    res.error('Error in adding note.');
  }
});

// router DELETE fxn is creating a new array of notes made up of all notes that ARE NOT the id selected by the user to be deleted | filter method taught by tutor
// id is assigned by uuid.js in helpers folder when each new note is posted

router.delete("/:id", async (req,res)=>{
  var currentNotes = await readData()
  var newNotes = currentNotes.filter(note => note.id != req.params.id)
  
  await writeFile("./db/notes.json", JSON.stringify(newNotes))
  res.json({
    message: 'Successfully deleted your note!'})
  console.info(`Note has been successfully deleted.`);

})

module.exports = router;
