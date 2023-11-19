import { useEffect, useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiData, setApiData] = useState(null);
  const [results, setResults] = useState(null);

  // fetch the api data only on the first render and set it to the current api data state
  useEffect(() => {
    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      });
  }, []);

  // whenever searchTerm is changed, update the results with the new search term
  useEffect(() => {
    if (apiData) {
      // if it's empty, don't reset the results state back to empty state
      if (searchTerm === "") return setResults(null);

      const filteredResults = apiData.filter((data) =>
        data.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredResults);
      setResults(filteredResults);
    }
  }, [searchTerm]);

  // if api data has not been loaded yet, don't render anything
  if (!apiData) return null;

  return (
    <div>
      find countries{" "}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Results setSearchTerm={setSearchTerm} results={results} />
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
    console.log(country);
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
      </div>
    );
  }

  console.log("rendering");
  return (
    <div>
      {props.results.map((result) => {
        return (
          <div key={result.name.common}>
            {result.name.common} <button onClick={() => props.setSearchTerm(result.name.common)}>show</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
