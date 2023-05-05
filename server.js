//* By using routes for modularization, I am able to simplify the server.js file to only include the importing of node modules and routes, defining the port, and calling 'app.use' for the entire application to tell the entire application how to respond to user interactions

const express = require('express');
// require('./routes') will look for index.js FIRST within the routes folder <JUST LIKE GITHUB DOES WITH INDEX.HTML>
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

//* ----------- MIDDLEWARE ----------- *//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));