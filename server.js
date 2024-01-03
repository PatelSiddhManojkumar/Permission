// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store permission records
let permissionRecords = [];

// Define a route to handle POST requests for saving permissions
app.post('/savePermission', (req, res) => {
    const { userName, permission } = req.body;
    permissionRecords.push({ userName, permission });
    res.send('Permission saved successfully!');
});

// Define a route to handle GET requests for fetching permission history
app.get('/getPermissionHistory', (req, res) => {
    res.json(permissionRecords);
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
    console.log(`Server is running at https://g8df7ks5-5500.inc1.devtunnels.ms/`);
});
