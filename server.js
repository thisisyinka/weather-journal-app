// Add express to project
const express = require('express');

// Initialise instance of app
const app = express();

// Middleware (body-parser has been deprecated as at Express 4.16+) 
app.use(express.json());
app.use(express.urlencoded());

const cors = require('cors');
app.use(cors());

// Serve static files
app.use(express.static('website'));

// Server
const port = 3000;
const server = app.listen(port, () => console.log(`Server successfully running on localhost:${port}`));

// Empty object
let projectData = {};

// GET request
const weatherDeets = (req, res) => {
    return res.send(projectData);
}
app.get('/getAllData', weatherDeets);


// POST request
const postData = (req, res) => {
    projectData = req.body;
    return res.send(projectData);
}
app.post('/newEntry', postData);