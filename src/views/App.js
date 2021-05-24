import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import BoxButton from "components/BoxButton";
import Select from "components/Select";
import DateSelect from "components/DateSelect";
import Loading from "components/Loading";
import Heading from "components/Heading";
import { makeReadableDate } from "helpers/functions";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  width: 100%;
  padding: 104px 15px 15px;
  background-color: ${({ theme }) => theme.gray6};
  overflow-x: hidden;
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
  height: calc(100vh - 104px);
  width: 100%;
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
  const [dateText, setDateText] = useState("");
  const [isDateReadonly, setIsDateReadonly] = useState(true);
  const [readonlyDate, setReadonlyDate] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleColor: "rgba(255, 255, 255, .87)",
        titleFont: { family: "Roboto, sans-serif", size: 21, weight: "500" },
        bodyFont: { family: "Roboto, sans-serif", size: 21, weight: "400" },
        bodyColor: "rgba(255, 255, 255, .6)",
        padding: {
          x: 6,
          y: 6,
        },
        caretPadding: 15,
        caretSize: 10,
        cornerRadius: 10,
        displayColors: false,
        backgroundColor: "rgb(44, 44, 46)",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgb(44, 44, 46)",
        },
      },
      y: {
        grid: {
          color: "rgb(44, 44, 46)",
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: 15,
    },
  });
  const [graphStyles, setGraphStyles] = useState({
    borderCapStyle: "round",
    borderColor: "rgb(10, 132, 255)",
    pointBorderWidth: 3,
    pointHitRadius: 8,
    pointRadius: 6,
    pointHoverBorderWidth: 12,
    backgroundColor: "rgb(28, 28, 30)",
  });

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
        ? `https://api.covid19api.com/world`
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
      if (data.length) {
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
                ...graphStyles,
              },
            ],
          },
          Confirmed: {
            labels: [],
            datasets: [
              {
                data: [],
                ...graphStyles,
              },
            ],
          },
          Deaths: {
            labels: [],
            datasets: [
              {
                data: [],
                ...graphStyles,
              },
            ],
          },
          Recovered: {
            labels: [],
            datasets: [
              {
                data: [],
                ...graphStyles,
              },
            ],
          },
        };

        data.forEach((obj) => {
          const { Active, Confirmed, Deaths, Recovered, Date } = obj;

          dataObj.Active.labels.push(makeReadableDate(Date));
          dataObj.Active.datasets[0].data.push(Active);

          dataObj.Confirmed.labels.push(makeReadableDate(Date));
          dataObj.Confirmed.datasets[0].data.push(Confirmed);

          dataObj.Deaths.labels.push(makeReadableDate(Date));
          dataObj.Deaths.datasets[0].data.push(Deaths);

          dataObj.Recovered.labels.push(makeReadableDate(Date));
          dataObj.Recovered.datasets[0].data.push(Recovered);
        });

        setGraphData(dataObj);

        setIsError(false);
        setIsLoading(false);
        setIsDateReadonly(false);
        setIsLoading(false);
      } else {
        setErrorMsg("Sorry, we don't have statistics for this country 😢");
        setIsError(true);
        setIsLoading(false);
      }
    } else if (data.length) {
      const dataObj = {
        Confirmed: {
          labels: [],
          datasets: [
            {
              data: [],
              ...graphStyles,
            },
          ],
        },
        Deaths: {
          labels: [],
          datasets: [
            {
              data: [],
              ...graphStyles,
            },
          ],
        },
        Recovered: {
          labels: [],
          datasets: [
            {
              data: [],
              ...graphStyles,
            },
          ],
        },
      };

      const sortedData = data.sort(
        (a, b) => new Date(a.Date) - new Date(b.Date)
      );

      sortedData.forEach((item) => {
        const { TotalConfirmed, TotalDeaths, TotalRecovered, Date } = item;

        dataObj.Confirmed.labels.push(makeReadableDate(Date));
        dataObj.Confirmed.datasets[0].data.push(TotalConfirmed);

        dataObj.Deaths.labels.push(makeReadableDate(Date));
        dataObj.Deaths.datasets[0].data.push(TotalDeaths);

        dataObj.Recovered.labels.push(makeReadableDate(Date));
        dataObj.Recovered.datasets[0].data.push(TotalRecovered);
      });

      const startData = sortedData[sortedData.length - 2];
      const endData = sortedData[sortedData.length - 1];

      const {
        TotalConfirmed: startConfirmed,
        TotalDeaths: startDeaths,
        TotalRecovered: startRecovered,
        Date: fromDate,
      } = startData;
      const {
        TotalConfirmed: Confirmed,
        TotalDeaths: Deaths,
        TotalRecovered: Recovered,
        Date: toDate,
      } = endData;

      setStatistics({
        Confirmed: {
          Confirmed: Confirmed,
          diffConfirmed: Confirmed - startConfirmed,
        },
        Deaths: {
          Deaths: Deaths,
          diffDeaths: Deaths - startDeaths,
        },
        Recovered: {
          Recovered: Recovered,
          diffRecovered: Recovered - startRecovered,
        },
      });

      setIsError(false);
      setIsLoading(false);
      setReadonlyDate([new Date(fromDate), new Date(toDate)]);
      setIsDateReadonly(true);
      setGraphData(dataObj);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (country === null && selectedStat === "Active") {
      setSelectedStat("Confirmed");
    }
  }, [country, selectedStat]);

  return (
    <Wrapper>
      <Row>
        <Select data={countries} setCountry={setCountry} />
        <DateSelect
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          setDateFrom={setDateFrom}
          dateText={dateText}
          setDateText={setDateText}
          isReadonly={isDateReadonly}
          readonlyDate={readonlyDate}
        />
      </Row>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : isError ? (
        <LoadingWrapper>
          <Heading big>{errorMsg}</Heading>
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
            <Line
              data={graphData[selectedStat]}
              height={600}
              options={chartOptions}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default App;
