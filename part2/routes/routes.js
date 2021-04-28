
var express = require("express");
const router = express.Router();

var TrainInfo = require("../controller/TrainInfo");

//router.use();
//list all book by admin
router.get("/train", TrainInfo.getTrainSolutions );
router.get("/train", TrainInfo.getRealTimeTrainInfo );
router.get("/train", TrainInfo.getRealTimeStationInfo );

module.exports = router;
 