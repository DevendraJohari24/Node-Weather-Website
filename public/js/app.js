console.log('Client side JavaScript is Loaded!');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    console.log(location);
    messageOne.textContent = 'Location.....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
      response.json().then((data) => {
        if(data.error){
          messageOne.textContent = data.error
        }else{
          messageOne.textContent = 'Location : ' + data.location
          messageTwo.textContent = 'Weather : ' + data.forecast.weather_description +  ". It is currently " + data.forecast.temperature + ' degress out. It feels like ' + data.forecast.feelslike + ' degree out'
          console.log(data.forecast);
        }

      })
    })

})