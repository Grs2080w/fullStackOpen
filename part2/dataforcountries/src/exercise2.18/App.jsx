import { useState, useEffect } from "react";
//server
import Countries from "./server/countries";
//components
import Filter from "./components/filter";
import CountrieFiltered from "./components/CountrieFiltered";
//style
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [countrieFiltered, setCountrieFiltered] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setCountries(Countries);
  }, []);

  useEffect(() => {
    let regExp = new RegExp(filter, "i");
    let countrieFiltered = countries.filter((c) => c.search(regExp) !== -1);
    setCountrieFiltered(countrieFiltered);
  }, [filter, countries]);

  function inputFilter(e) {
    setFilter(e.target.value);
  }

  const filter2 = 'htjrtj'

  return (
    <div>
      <Filter filter={filter} inputFilter={inputFilter} />
      <CountrieFiltered filter2={filter2} countrieFiltered={countrieFiltered} setCountrieFil={setCountrieFiltered} />
    </div>
  );
}
