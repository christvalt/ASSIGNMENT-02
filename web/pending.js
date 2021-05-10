async function getData (){
    try{
          var rp = require ('request-promise-native');
          var options = {
          uri:'https://www.lefrecce.it/msite/api/solutions?origin=CESENA&destination=BOLOGNA%20CENTRALE&arflag=A&adate=18/04/2021&atime=11&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false',
          json:true
        };

        var response = await rp(options);
        return response;
    }catch(error){
        throw error;
    }        
}

try{
    console.log(getData());
}catch(error){
    console.log(error);
}