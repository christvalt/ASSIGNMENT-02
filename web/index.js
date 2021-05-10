const fetch = require('node-fetch');
//const fetch from 'node-fetch';
const axios = require('axios');
//

var solutions = {
  from:"CESENA",
  to:"BOLOGNA%20CENTRALE",
  date:18/04/2021,
  time:11
};

//function controler ()

// restp API asncr
//call rest api acsync

_EXTERNAL_URL2 ='http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/[CODICE_STAZIONE]/[NUMERO_TRENO]/[DATA'

EXEMPLE ='http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/S01700/8811/1619268761882'

const getApiSolutiionTrain = async ( from , to , date , time) => {

  _EXTERNAL_URL1 =`https://www.lefrecce.it/msite/api/solutions?origin=${from}&destination=${to}&arflag=A&adate=${date}&atime=${time}&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false`

	  console.log("second test")
	try{
  const response = await fetch(_EXTERNAL_URL1) // get users list
  const users = await response.json() // parse JSON
  //console.log("test")
    console.log(users);
  users.forEach(async(solution)=>{
	   console.log("readyState solution "+ solution.idsolution)
			const detailSingleSolution  =  await fetch('https://www.lefrecce.it/msite/api/solutions/a927f32a47ad50dc1a31dbab35a7a501i0/info')//get detail  solution
            const detailData=  await detailSingleSolution.json() // parse the json  data
            return detailData
          console.log(detailData)
			console.log( "test is "+detailData);
  })	
	}catch(err){
		console.error(err);
		}
  ///lab me launch
}

const getRealTimeTrainInfo = async () => {
  var solutions = {
    from:"CESENA",
    to:"BOLOGNA",
    date:08/05/2021,
    time:11
  };
	  console.log("second fuction ")
	try{
		  console.log("preference")
  const response = await fetch(EXEMPLE)
  const prova =  await response.json() // get users list
  console.log(prova);

	}catch(err){
		console.error(err);
		}
  
}

const getRealTimeStationInfo = async () => {
  var solutions = {
    from:"CESENA",
    to:"BOLOGNA",
    date:18/04/2021,
    time:11
  };
	  console.log("second fuction ")
	try{
		  console.log("preference")
  const response = await fetch(EXEMPLE)
  const prova =  await response.json() // get users list
  console.log(prova);

	}catch(err){
		console.error(err);
		}
  
}

getApiSolutiionTrain("CESENA" , "BOLOGNA%20CENTRALE" , "08/05/2021" , "11")
getRealTimeTrainInfo(),
getRealTimeStationInfo()
