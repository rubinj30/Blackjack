// use moment.js to get today's date in a format for api call
// use axios for api call and pull out current temp for specificed cities
// use jquery to manipulate DOM and insert weather

const axios = require('axios')

const locations = [
    reno = {
        city: "Reno",
        state: "NV",
        temperature: '',
        generalWeather: '',
        iconUrl: '',
        temperature: '',

    },
    vegas = {
        city: "Las_Vegas",
        state: "NV",
        generalWeather: '',
        iconUrl: '',
        temperature: '',

    },
    atlanticCity = {
        city: 'Atlantic_City',
        state: "NJ",
        generalWeather: '',
        iconUrl: '',
        temperature: '',
        
    }
]
// console.log(locations)
const getWeather = (city, state, i) => {
    const url = `http://api.wunderground.com/api/500fc45859e1f98f/conditions/q/${state}/${city}.json`
    axios.get(url)
        .then((response) => {
            console.log(response.data.current_observation)
            locations[i].temperature = response.data.current_observation.temp_f
            locations[i].iconUrl = response.data.current_observation.icon_url


            // console.log(response.data
        })
    }

// getWeather(reno.city, reno.state, 0)
// getWeather(vegas.city, vegas.state, 1)
// getWeather(atlanticCity.city, atlanticCity.state, 2)

locations.forEach( async (location, index, array) => {
    await getWeather(location.city, location.state, index)
    console.log(location)
})

setTimeout(() => {console.log(locations)}, 2000)

