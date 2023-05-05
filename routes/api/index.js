// instead of importing the entire express package, I can pull the Router() function to define the routes and call them into the app.use() or router.use() methods
const router = require('express').Router();

// this will then allow me to pull in the specific routes for the notes page into the api index to then be pulled into the master routes index.js
const notesRouter = require("./noteRoutes")

router.use('/notes', notesRouter);

module.exports = router;