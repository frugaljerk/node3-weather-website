const weatherform = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")
const weatherImg = document.querySelector("#weatherIcon")

messageOne.textContent = ''

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchElement.value
    messageOne.textContent = "loading..."
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            console.log(data.forecastData)
            messageOne.textContent = data.location
            weatherImg.src = data.forecastData.weather_icons[0]
            messageTwo.textContent = `${data.forecastData.weather_descriptions} with temperature of ${data.forecastData.temperature} degree.`
            

            
        }
        
    })
})
    
    
})
