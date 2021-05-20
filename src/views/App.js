import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BoxButton from "components/BoxButton";
import Select from "components/Select";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  width: 100%;
  padding: 104px 15px 15px;
  background-color: ${({ theme }) => theme.gray6};
  transition: background-color 0.15s ease-in-out;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const STATS = [
  "Total Confirmed",
  "New Confirmed",
  "Total Deaths",
  "New Deaths",
  "Total Recovered",
  "New Recovered",
];

function App() {
  const [data, setData] = useState({});
  const [selectedStat, setSelectedStat] = useState(0);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://api.covid19api.com/countries`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCountries(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    console.log(country);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      country === null
        ? `https://api.covid19api.com/summary`
        : `https://api.covid19api.com/country/${country.Slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, [country]);

  useEffect(() => {
    console.log(data);
  }, [data, country]);

  return (
    <Wrapper>
      <Select data={countries} setCountry={setCountry} />
      <Row>
        {STATS.map((text, i) => (
          <BoxButton
            key={text}
            text={text}
            value={100282}
            handleSelect={() => setSelectedStat(i)}
            active={selectedStat === i}
            difference={1084}
          />
        ))}
      </Row>
      <div>charts</div>
    </Wrapper>
  );
}

export default App;
