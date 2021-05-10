//var mongoose = require("mongoose");
const express = require("express");
const https = require('https');
const router = express.Router();
const axios = require('axios');
const fetch = require('node-fetch');

_EXTERNAL_URL2 ='http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/[CODICE_STAZIONE]/[NUMERO_TRENO]/[DATA'
EXEMPLE ='http://www.viaggiatreno.it/viaggiatrenomobile/resteasy/viaggiatreno/andamentoTreno/S01700/8811/1619268761882'
const  firstApiExemple = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/cercaNumeroTrenoTrenoAutocomplete/3988"
const secondAPIExemple = "http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/tratteCanvas/S05043/3988/1620511200000"

/**
 * 
 * @param {cita di partenzza } from 
 * @param {*cita di arrivo } to 
 * @param {*data di partenza in giorno mese anno} date 
 * @param {*orario di partenza} time 
 */

const getApiSolutiionTrain = async ( from , to , date , time) => {

    _EXTERNAL_URL1 =`https://www.lefrecce.it/msite/api/solutions?origin=${from}&destination=${to}&arflag=A&adate=${date}&atime=${time}&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false`
  
        console.log("first test function**")
      try{
    const response = await fetch(_EXTERNAL_URL1) // get users list
    const solutions = await response.json() // parse JSON
    //console.log("test")
      console.log(solutions);
      solutions.forEach(async(solution)=>{
        try {
             console.log("readyState solution "+ solution.idsolution)
              const detailSingleSolution  =  await fetch(`https://www.lefrecce.it/msite/api/solutions/${solution.idsolution}/details`)//get detail  solution
              const detailData=  await detailSingleSolution.json() // parse the json  data
              console.log(detailSingleSolution.body)

              return detailData

        } catch (err) {
            console.log(err);
        }
        
    })	
      }catch(err){
          console.error(err);
          }
  }
/**const gtry = async (idsolution) => {
    getApiSolutiionTrain.solutions.forEach(async(solution)=>{
        try {
             console.log("readyState solution "+ solution.idsolution)
              const detailSingleSolution  =  await fetch(`https://www.lefrecce.it/msite/api/solutions/${solution.idsolution}/details`)//get detail  solution
              const detailData=  await detailSingleSolution.json() // parse the json  data
              console.log(detailSingleSolution.body)

              return detailData

        } catch (err) {
            console.log(err);
        }
        
    })

  } */

  /**
   * 
   * @param {*} codeDepature 
   * @param {*} codeTrain 
   * @param {*} timeInsecond 
   */
  const getRealTimeTrainInfo = async ( codeDepature , codeTrain , timeInsecond ) => {
     console.log("second test function**")
      try{
        const response = await fetch(`http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/tratteCanvas/${codeDepature}/${codeTrain}/${timeInsecond}`)
        const realTimeTrain = await response.json() // parse JSON
      console.log(realTimeTrain);
      	
      }catch(err){
          console.error(err);
          }
  }

  /*const getRealTimeTrainInfo = async (numTrain) => {
      try{  
    const response = await fetch(`http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/tratteCanvas/${codeDepature}/${codeTrain}/${timeInsecond}`)
    const  result =  await response.json() // get users list
    console.log("result result "+result);
    return result;

    //const  parsing = JSON.stringify( htmlString)
  
      }catch(err){
          console.error(err);
          }
    
  } */

  /**
   * 
   * @returns  realtime information about a give station 
   *  
   */
  
  const getRealTimeStationInfo = async (CODICE_STAZIONE ,data) => {
   //http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/arrivi/[CODICE_STAZIONE]/[DATA]
        console.log("thrirt test fuction** ")
      try{
            const response = await fetch(`http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/arrivi/${CODICE_STAZIONE}/${data}`)
            const prova =  await response.json() // get users list
    console.log(prova);
    return prova;
  
      }catch(err){
          console.error(err);
          }
    
  }

module.exports = {
    getApiSolutiionTrain,
    getRealTimeTrainInfo,
    getRealTimeStationInfo
  };
