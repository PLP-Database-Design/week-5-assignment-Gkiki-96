// import our dependacies
const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require ('dotenv');

// configure enviroment viariables
dotenv.config();

// create a  connection object
const db =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// test the connection
db.connect((err) => {
   // if the connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

   // of the connection is successful
   console.log("Successfully connected to MYSQL: ", db.threadId)
})


// retrive all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, data) => { 
        // if l have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err )
        }

        res.status(200).send(data)
    })
})


// retrive all providers
app.get("/get-providers", (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if error
        if(err) {
            return res.status(500).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})

//retrive patient by first name
app.get('/get-patients/first-name/:firstName', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err,data) => {
      // if error
      if(err) {
        return res.status(500).send("Failed to get patients", err)
      }

      res.status(200).send(data)
    })
})

// retrieves all providers by their specialty
app.get("/get-providers/specialty/:specialty", (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err,data) => {
      // if error
      if(err) {
        return res.status(500).send("Failed to get providers", err)
      }

      res.status(200).send(data)
    })
})

// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})