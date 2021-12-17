const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let patients = new Object();
patients["999991234"] = ["Sponge", "Bob", "920-333-1234"]
patients["999995678"] = ["Patrick", "Star", "920-333-5678"]

let records = new Object();
records["999991234"] = "Status: Healthy"
records["999995678"] = "Status: Covid"

// Get patient medical
app.get("/records", (req, res) => {
    

    // Verify Patient Exists
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }

    // Verify SSN Matches First and Last Name
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        if (req.body.reasonforvisit === "medicalrecords") {
            res.status(200).send(records[req.headers.ssn]);
            return;
        }
        else {
            res.status(501).send({"msg":"Failed to complete the request at this time: " + req.body.reasonforvisit})
            return;
        }
    }
    else {
        res.status(401).send({"msg":"Firstname or lastname didn't match SSN."})
        return;
    }

    // Return Appropriate Record
    res.status(200).send({"msg": "HTTP GET - SUCCESS!"})
});

// Create a new patient
app.post("/", (req, res) => {

    // Create patient in database
    patients[req.headers.ssn] = [req.headers.firstname, req.headers.lastname, req.headers.phone]
    res.status(200).send(patients)
});

// Update existing patient phone number
app.put("/", (req, res) => {

    // Verify Patient Exists
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }

    // Verify Patient Exists
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }

    // Verify SSN Matches First and Last Name
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        patients[req.headers.ssn] = [req.headers.firstname, req.headers.lastname, req.body.phone];
        res.status(200).send(patients[req.headers.ssn]);
    }
    else {
        res.status(401).send({"msg":"Firstname or lastname didn't match SSN. (Trying to update phone number.)"})
        return;
    }
    
    // Ensure 
    res.status(200).send({"msg": "HTTP PUT - SUCCESS!"})
});

// Delete patient records
app.delete("/", (req, res) => {
    
    // Verify Patient Exists
    if (records[req.headers.ssn] === undefined) {
        res.status(404).send({"msg" : "Patient not found."})
        return;
    }

    // Verify SSN Matches First and Last Name
    if (req.headers.firstname == patients[req.headers.ssn][0] && req.headers.lastname == patients[req.headers.ssn][1]) {
        delete patients[req.headers.ssn]
        delete records[req.headers.ssn]

        res.status(200).send({"msg":"Patient's information is successfully deleted."});
        return;
    }
    else {
        res.status(401).send({"msg":"Firstname or lastname didn't match SSN. Trying to delete the patient's information."})
        return;
    }

    res.status(200).send({"msg": "HTTP DELETE - SUCCESS!"})
});

app.listen(3000);
