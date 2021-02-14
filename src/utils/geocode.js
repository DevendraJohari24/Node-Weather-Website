const request = require('request')
const geoCode = (address, callback) =>{
 const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGV2ZW5kcmFqb2hhcmkiLCJhIjoiY2tsMTYzNXd0MTA0bjJycW9wNWVzdHh0aCJ9.4T8bW0vYYWs3yxXjgv51fw"
 request({url: geocodeURL, json: true}, (error, response)=>{
  
   if (error){
    callback('Unable to connect to Location Services!',undefined)
  } else if(response.body.features.length === 0){
    callback("Unable to find Location!. Try Another Search",undefined);
  } else{
    callback(undefined, {
      lattitude: response.body.features[0].center[1],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name
    })

  }
 })
}

module.exports = geoCode
