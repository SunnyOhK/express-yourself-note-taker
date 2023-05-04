const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const tips = require('./routes/tips');

const PORT = 3001;
const app = express();

const middleware = (req, res, next) => {
  // Log out the request resource
  console.log(`${req.method} request to ${req.path}`);
  next();
};

// * Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use('/api/tips', tips);
app.use(clog);

app.use(express.static('public'));

app.use(middleware);

app.get('/', (req, res) => res.json(`GET route`));
app.post('/', (req, res) => res.json(`POST route`));
app.put('/:id', (req, res) => res.json(`PUT route`));
app.delete('/:id', (req, res) => res.json(`DELETE route`));
app.patch('/:id', (req, res) => res.json(`PATCH route`));

// GET Route for homepage
app.get('/clog', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// // GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
