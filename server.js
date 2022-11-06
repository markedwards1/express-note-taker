const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api')  ;
const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(webRoutes);
app.use(apiRoutes);





// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data

//for form data 
// app.use('/api', api);


// GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, './routes/web.js'))
// );

// // GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

// // Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.status(404).send('oh no you better dont 404 error')
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
