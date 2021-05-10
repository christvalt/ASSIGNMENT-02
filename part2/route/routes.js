
var express = require("express");
const router = express.Router();

var TrainInfo = require("../controller/TrainInfo");

router.get('/', function(req, res) {
    res.send('hello word!!!');
  });

router.post("/trainSolution", async function(req, res) {
console.log("body",req.body);

  try {
    const result = await  TrainInfo.getApiSolutiionTrain(req.body.from, req.body.to, req.body.date,req.body.time);
  } catch (err) {
    throw new Error(err);
    
  }
  
} );

router.post("/details", async function(req, res) {
  console.log("body",req.body);
  
    try {
      const result = await  TrainInfo.gtry(req.body.idsolution);
    } catch (err) {
      throw new Error(err);
      
    }
    
  } );
  
router.post("/realtimeTrain", async function(req, res) {
//console.log("body",req.body);
//codeDepature , codeTrain , timeInsecond
console.log("body",req.body);

  try {
    const result = await  TrainInfo.getRealTimeTrainInfo(req.body.codeDepature, req.body.codeTrain, req.body.timeInsecond);
  
  } catch (err) {
    throw new Error(err);
    
  }
  
} );

router.post("/realtimeStation", async function(req, res) {
  //CODICE_STAZIONE ,data
    try {
      console.log("body",req.body);

      const result = await  TrainInfo.getRealTimeStationInfo(req.body.CODICE_STAZIONE,req.body.data);
    
    } catch (err) {
      throw new Error(err); 
      
    }
    
  } );

//router.get("/train3", TrainInfo.getRealTimeStationInfo );

module.exports = router;
