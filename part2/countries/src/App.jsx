import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiData, setApiData] = useState(null);
  const [results, setResults] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // fetch the api data only on the first render and set it to the current api data state
  useEffect(() => {
    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      });
  }, []);

  // whenever searchTerm is changed, update the results with the new search term
  useEffect(() => {
    // if it's empty, reset the results state back to empty state
    if (searchTerm === "") return setResults(null);

    const filteredResults = apiData.filter((data) =>
      data.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredResults);
    setResults(filteredResults);

    // make weather api call only if there's one result
    if (filteredResults.length === 1) {
      const lat = filteredResults[0].latlng[0];
      const lon = filteredResults[0].latlng[1];
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        });
    }
  }, [apiData, searchTerm]);

  // if api data has not been loaded yet, don't render anything
  if (!apiData) return null;

  return (
    <div>
      find countries{" "}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Results
        setSearchTerm={setSearchTerm}
        results={results}
        weatherData={weatherData}
      />
    </div>
  );
};

const Results = (props) => {
  if (!props.results) return null;

  if (props.results.length > 10)
    return (
      <>
        <br></br>Too many matches, specify another filter
      </>
    );

  if (props.results.length === 1) {
    const country = props.results[0];
    const temp = Math.round((props.weatherData.main.temp - 273.15) * 1.8 + 32);
    const wind = props.weatherData.wind.speed;
    const icon = props.weatherData.weather[0].icon
    
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital[0]}
          <br></br>
          area {country.area}
        </p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>Weather in {country.capital[0]}</h2>
        <p>
          temperature {temp}
          {"\u00B0"}
        </p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        <p>wind {wind} m/s</p>
      </div>
    );
  }

  console.log("rendering");
  return (
    <div>
      {props.results.map((result) => {
        return (
          <div key={result.name.common}>
            {result.name.common}{" "}
            <button onClick={() => props.setSearchTerm(result.name.common)}>
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
