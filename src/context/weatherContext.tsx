import React, { createContext, useReducer, useContext } from 'react';
import { IWeatherState } from 'interfaces';
import useWeatherReducer from './useWeatherReducer';

// interfaces
interface IWeatherDispatch {
  dispatch?: Function;
}

// initial state
const initialState: IWeatherState = {
  fetchFailed: false,
  fetchRequested: false
};

// contexts
const WeatherContextState = createContext<IWeatherState>(initialState);
const WeatherContextDispatch = createContext<IWeatherDispatch>({});

// custom consumer hooks
const useWeatherState = () => {
  const context: IWeatherState = useContext(WeatherContextState);
  if (context === undefined) {
    throw new Error('Your component is not wrapped inside WeatherProvider');
  }

  const { weather, query, fetchFailed, fetchRequested } = context;

  return { weather, query, fetchFailed, fetchRequested };
};

// custom dispatcher
const useWeatherDispatch = () => {
  const context: IWeatherDispatch = useContext(WeatherContextDispatch);
  if (context === undefined) {
    throw new Error('Your component is not wrapped inside WeatherProvider');
  }

  const { dispatch } = context;

  return dispatch;
};

const WeatherProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(useWeatherReducer, initialState);

  return (
    <WeatherContextState.Provider value={state}>
      <WeatherContextDispatch.Provider value={{ dispatch }}>
        {children}
      </WeatherContextDispatch.Provider>
    </WeatherContextState.Provider>
  );
};

export { WeatherProvider, useWeatherState, useWeatherDispatch };
