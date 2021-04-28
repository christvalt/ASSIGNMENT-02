//var mongoose = require("mongoose");
const express = require("express");
const https = require('https');

/**
 * 
 */ 

//const Book = require("../../models/bookmodel/bookModel");
//const Category = require("../../models/category/category");

const router = express.Router();
_EXTERNAL_URL ='https://www.lefrecce.it/msite/api/solutions?origin=CESENA&destination=BOLOGNA%20CENTRALE&arflag=A&adate=18/04/2021&atime=11&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false'
/*require.get('https://www.lefrecce.it/msite/api/solutions?origin=CESENA&destination=BOLOGNA%20CENTRALE&arflag=A&adate=18/04/2021&atime=11&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false', function (error, response, body) {
    if (error) {
        throw error;
    }

    const data = JSON.parse(body);
    reply.view('index', { result: data });
});*/

/*const getTrainSolutions  = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return callback(data);
       // console.log(JSON.stringify(data));
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}*/

const axios = require('axios');

const getTrainSolutions = async () => {
    try {
        const resp = await axios.get(_EXTERNAL_URL);
        console.log(resp.data);
        console.log("test1")
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

getTrainSolutions

var returnObject = {
    getTrainSolutions,
  };
  
  //console.log("tes"+getTrainSolutions.resp)