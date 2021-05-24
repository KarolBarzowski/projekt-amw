import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import BoxButton from "components/BoxButton";
import Select from "components/Select";
import DateSelect from "components/DateSelect";
import Loading from "components/Loading";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
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

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [statistics, setStatistics] = useState({});
  const [selectedStat, setSelectedStat] = useState("Active");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [dateFrom, setDateFrom] = useState(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  const [dateTo, setDateTo] = useState(new Date());
  const [graphData, setGraphData] = useState({});

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
    setIsLoading(true);

    const fromQuery = `${dateFrom.getFullYear()}-${
      dateFrom.getMonth() + 1
    }-${dateFrom.getDate()}T00:00:00Z`;
    const toQuery = `${dateTo.getFullYear()}-${
      dateTo.getMonth() + 1
    }-${dateTo.getDate()}T00:00:00Z`;

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      country === null
        ? `https://api.covid19api.com/summary`
        : `https://api.covid19api.com/country/${country.Slug}?from=${fromQuery}&to=${toQuery}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }, [country, dateFrom, dateTo]);

  useEffect(() => {
    if (country !== null) {
      const startData = data[0];
      const endData = data[data.length - 1];

      const {
        Active: startActive,
        Confirmed: startConfirmed,
        Deaths: startDeaths,
        Recovered: startRecovered,
      } = startData;
      const { Active, Confirmed, Deaths, Recovered } = endData;

      setStatistics({
        Active: {
          Active,
          diffActive: Active - startActive,
        },
        Confirmed: {
          Confirmed,
          diffConfirmed: Confirmed - startConfirmed,
        },
        Deaths: {
          Deaths,
          diffDeaths: Deaths - startDeaths,
        },
        Recovered: {
          Recovered,
          diffRecovered: Recovered - startRecovered,
        },
      });

      const dataObj = {
        Active: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
        Confirmed: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
        Deaths: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
        Recovered: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
      };

      data.forEach((obj) => {
        const { Active, Confirmed, Deaths, Recovered, Date } = obj;

        dataObj.Active.labels.push(Date);
        dataObj.Active.datasets[0].data.push(Active);

        dataObj.Confirmed.labels.push(Date);
        dataObj.Confirmed.datasets[0].data.push(Confirmed);

        dataObj.Deaths.labels.push(Date);
        dataObj.Deaths.datasets[0].data.push(Deaths);

        dataObj.Recovered.labels.push(Date);
        dataObj.Recovered.datasets[0].data.push(Recovered);
      });

      setGraphData(dataObj);

      setIsLoading(false);
    } else if (data.Global) {
      console.log(data);
      const {
        NewConfirmed,
        TotalConfirmed,
        NewDeaths,
        TotalDeaths,
        NewRecovered,
        TotalRecovered,
      } = data.Global;
      const { Date } = data;

      setStatistics({
        Confirmed: {
          Confirmed: TotalConfirmed,
          diffConfirmed: NewConfirmed,
        },
        Deaths: {
          Deaths: TotalDeaths,
          diffDeaths: NewDeaths,
        },
        Recovered: {
          Recovered: TotalRecovered,
          diffRecovered: NewRecovered,
        },
      });

      setIsLoading(false);
    }
  }, [data]);

  return (
    <Wrapper>
      <Row>
        <Select data={countries} setCountry={setCountry} />
        <DateSelect
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
        />
      </Row>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <>
          <Row>
            {Object.keys(statistics).map((objectKey, i) => (
              <BoxButton
                key={objectKey}
                text={objectKey}
                value={statistics[objectKey][objectKey]}
                handleSelect={() => setSelectedStat(objectKey)}
                active={selectedStat === objectKey}
                difference={statistics[objectKey][`diff${objectKey}`]}
              />
            ))}
          </Row>
          <div>
            <Line data={graphData[selectedStat]} />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default App;
