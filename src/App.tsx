import React, { useEffect } from 'react';
import { useWeatherState, useWeatherDispatch } from 'context/weatherContext';
import { GET_FORECAST, FETCH_REQUESTED, FETCH_FAILED } from 'types';
import { IWeatherState } from 'interfaces';
import { weatherAPI } from 'services';
import { AxiosResponse } from 'axios';
import { Form, Panel } from 'components';

// openweathermap REF = https://openweathermap.org/forecast5
// cnt = number of lines in response
// units = format
// q = query / city
// request example = api.openweathermap.org/data/2.5/forecast?&APPID=63cc671f5fd5f6b9f6732ed8344316e1&q=london&cnt=5&units=metric

const App: React.FC = () => {
  const state: IWeatherState = useWeatherState();
  const dispatchAction = useWeatherDispatch();

  // get forecast
  const getForecast = async () => {
    try {
      const response: AxiosResponse = await weatherAPI.get(
        `&q=${state.query}&APPID=${process.env.REACT_APP_WEATHER_APP_API}&cnt=5&units=metric`
      );

      const { data } = response;

      if (dispatchAction) {
        dispatchAction({ type: GET_FORECAST, payload: data });
      }
    } catch (error) {
      if (dispatchAction) {
        dispatchAction({ type: FETCH_FAILED });
      }
    }
  };

  useEffect(() => {
    if (state.query && dispatchAction) {
      dispatchAction({ type: FETCH_REQUESTED });
      getForecast();
    }
  }, [state.query]);

  return (
    <div className='App'>
      <h1>Weather App</h1>
      <Form />
      {state.fetchFailed === true && <div>Something went wrong..</div>}
      {!state.fetchFailed &&
        !state.fetchRequested &&
        typeof state.weather === 'object' && <Panel />}
    </div>
  );
};

export default App;
