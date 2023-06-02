const request = require('postman-request');

const geocode = (address, callback) => {
    const encoded_address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded_address}.json?access_token=pk.eyJ1IjoiaHNhcGllbnMiLCJhIjoiY2xpM2MxZGJ3MHlnMDNlbzAxdHVrcmExYiJ9.9FiXt9myER8KwJ5b3aiPWg`

    request({url, json:true}, (error, {body})=>{
       
        if(error){
            callback(error, undefined)
        }else if (body.features.length === 0){
            callback(`Error from Response: ${body.features}`, undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}




module.exports = geocode