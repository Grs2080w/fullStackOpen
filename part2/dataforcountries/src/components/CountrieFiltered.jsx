// server
import { getCountrie, getWeather } from "../server/server";
import { useState, useEffect } from "react";

export default function CountrieFiltered({
  countrieFiltered,
  filter,
  setCountrieFil,
}) {

  const [capital, setCapital] = useState(null);
  const [area, setArea] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getWeather(countrieFiltered[0])
      .then((response) => {
        setWind(response.data.wind.speed);
      })
      
    }
  }, [countrieFiltered]);

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getWeather(countrieFiltered[0]).then((response) => {
        let temp = Number(response.data.main.temp ?? 0)
        let tempFinal = temp - 273

        setTemperature(tempFinal.toFixed(0));
      })
    }
  }, [countrieFiltered]);

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getWeather(countrieFiltered[0]).then((res) => {
        let icon = res.data.weather[0].icon
        setIcon(icon)
      })
    }
  }, [countrieFiltered]);


  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getCountrie(countrieFiltered[0]).then((response) => {
        setCapital(response.data[0].capital[0]);
      });
    }
  }, [countrieFiltered]);

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getCountrie(countrieFiltered[0]).then((response) => {
        setArea(response.data[0].area);
      });
    }
  }, [countrieFiltered]);

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getCountrie(countrieFiltered[0]).then((response) => {
        let languages = response.data[0].languages;
        let valueLanguages = Object.values(
          languages === undefined ? [] : languages
        );
        setLanguages(valueLanguages);
      });
    }
  }, [countrieFiltered]);

  useEffect(() => {
    if (countrieFiltered.length === 1) {
      getCountrie(countrieFiltered[0]).then((response) => {
        setFlag(response.data[0].flags.png);
      });
    }
  }, [countrieFiltered]);

  if (filter === "") {
    return <div></div>;
  } else if (countrieFiltered.length > 10) {
    return <div>So many countries, be more specific</div>;
  } else if (countrieFiltered.length !== 1) {

    return (
      <div>
        {countrieFiltered.map((c) => (
          <div key={c} className="countrie">
            <div className="countrieName">{c}</div>
            <button onClick={() => setCountrieFil(c)} className="btnShow">
              show
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>{countrieFiltered[0]}</h1>

        <div>Capital {capital}</div>
        <div>Area {area}</div>

        <h4>Languages</h4>

        <div>
          {languages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </div>

        <div className="flag">
          <img className="flag" src={flag} alt="flag-countrie" />
        </div>

        <h1>Weather in {countrieFiltered[0]}</h1>
        <div>
          <p>temperature {temperature} Celsius</p>
        </div>

        <div>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        </div>

        <div>
          <p>wind {wind} m/s</p>
        </div>

      </div>
    );
  }
}
