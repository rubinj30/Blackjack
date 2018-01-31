// use moment.js to get today's date in a format for api call
// use axios for api call and pull out current temp for specificed cities
// use jquery to manipulate DOM and insert weather

const axios = require('axios')

const locations = [
    {
        city: "Reno",
        state: "NV",
        temperature: '',
        generalWeather: '',
        iconUrl: ''
    },
    {
        city: "Las_Vegas",
        state: "NV",
        generalWeather: '',
        iconUrl: ''
    },
    {
        city: 'Atlantic-City',
        state: "NJ",
        generalWeather: '',
        iconUrl: '',

    }
]

const getWeather = (city, state) => {
    const url = `http://api.wunderground.com/api/500fc45859e1f98f/conditions/q/${state}/${city}.json`
    axios.get(url)
        .then((response) => {
            console.log(response.data.current_observation.temp_f)
            // locations[i].temperature = response.data

            return response.data
        })
    }

getWeather(locations[0].city, locations[0].state)

