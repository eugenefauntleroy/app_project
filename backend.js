const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mysql');
const mailchimp = require('mailchimp-api-v3');
const secrets = require('./.env');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const mailchimp = require('mailchimp-api-v3');


// Create the server
const app = express();
app.use(bodyParser.json());

// Connect to the SQL database
const connection = sql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database'
});
connection.connect();

// Connect to the Mailchimp API
const mailchimpClient = new mailchimp('your-api-key');

// Endpoint to create a new itinerary
app.post('/itinerary', (req, res) => {
    const itinerary = req.body;

    // Save the itinerary to the SQL database
    connection.query('INSERT INTO itineraries SET ?', itinerary, (error) => {
        if (error) throw error;
        res.send('Itinerary created successfully');
    });
});

// Endpoint to subscribe an email to a Mailchimp list
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    // Subscribe the email to the Mailchimp list
    mailchimpClient.post('lists/your-list-id/members', {
        email_address: email,
        status: 'subscribed'
    }).then((result) => {
        res.send('Email subscribed successfully');
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// backend.js file that creates a Node.js/Express.js server, 
//connects to a SQL library, and integrates with Mailchimp CRM

//need to import the correct libraries, the correct path to your files, 
//and correct naming conventions and functions. Additionally, you need to set the 
//correct parameters for your SQL database connection and Mailchimp API key.
//Please note that this code uses the Express.js framework and the mysql and mailchimp-api-v3 libraries. 
//You may need to install these packages first by running npm install express mysql mailchimp-api-v3

//In the backend.js file, you need to run the backend.js file on a server, and make sure it's 
//running before you run the script.js file and the HTML file. You can use the package.json file 
//to set the start script to run the backend.js file, and you can use npm start to run it.