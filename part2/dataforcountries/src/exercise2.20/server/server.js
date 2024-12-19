import axios from "axios";
import countriesWeather from "./countriesWeather";

let url = "https://restcountries.com/v3.1/name/";
async function getCountrie(countrie) {
  return await axios.get(url + countrie);
}

const keys = process.env.REACT_APP_API_KEY;

async function getWeather(countrie) {
  let haveWeather = false;
  countriesWeather.forEach((country) => {
    if (countrie === country) {
      haveWeather = true;
    }
  });

  if (haveWeather) {
    return await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${countrie}&appid=${keys}`
    );
  } else {
    return {
      data: {
        main: {
          temp: 273,
        },
        wind: {
          speed: 0,
        },
        weather: [{ icon: "02d" }],
      },
    };
  }
}

export { getCountrie, getWeather };
/*data: {
    main: {
        temp: 273
    },
    wind:{
        speed:0
    }, 
    weather:[{icon:'02d'}]
}*/
