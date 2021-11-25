const request = require('request')

const forecast = (latitude, longitude, callback) =>  {
    const url = 'http://api.weatherstack.com/current?access_key=708467dd178c4eb3b40ae79b597d5f1d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    // console.log(url)
    request({ url, json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather Services', undefined)
        } else if (body.error) {
            callback('Couldnt find the Weather of location. Try another Search', undefined)
        } else {
            forecastdata = body.current.temperature+ " degrees out. It feels like "+body.current.feelslike+" degrees out. "+"Humidity is "+body.current.humidity+"%."

            callback(undefined, forecastdata)
        }
    })
}

module.exports = forecast