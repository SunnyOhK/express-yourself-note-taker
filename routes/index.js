const router = require('express').Router();
const apiRouter = require('./api');
const pageRouter = require("./pageRoutes")

// If we want to interact with our database at localhost:3001/api, use the routers created in the api folder (notes page + index):
router.use('/api', apiRouter);

// If we want to visit localhost:3001/ (or simply arrive at the app homepage), use:
router.use("/", pageRouter);

module.exports = router;