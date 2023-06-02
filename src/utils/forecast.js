const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d4716f0a7e8545e033b260ce1f78eaf4&query=${latitude},${longitude}`;

request({url, json:true}, (error, {body})=>{
    if (error){
        callback("unable to connet to weather service", undefined);
    }else if (body.error){
        callback(`Error: ${body.error.info}`, undefined);
    }else{
        const current = body.current;
        callback(undefined, current)
    }
    
})
}

module.exports = forecast