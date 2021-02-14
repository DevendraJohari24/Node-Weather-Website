const request = require('request')
const foreCast = (lattitude,longitude,callback) => {
   const url = "http://api.weatherstack.com/current?access_key=a808d401424b5f1d4645526d9d297bf2&query="+ lattitude + "," + longitude +"&units=m"

   request({url: url, json: true},(error, response)=>{

     if(error){
         callback('Unable to connect to Weather Services!',undefined)
     } else if(response.body.error){
       callback("Unable to find Location!. Try Another Search",undefined);
     } else{
       callback(undefined,{
         weather_description: response.body.current.weather_descriptions[0],
         feelslike: response.body.current.feelslike,
         temperature:  response.body.current.temperature,
       })
     }
   })
}

module.exports = foreCast
