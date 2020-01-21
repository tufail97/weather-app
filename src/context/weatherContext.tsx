import React, { createContext, useReducer, useContext } from 'react';
import { IWeatherResponse } from 'interfaces';

// interfaces
interface IWeatherDispatch {
  dispatch?: Function;
}

export interface IWeatherState {
  query?: string;
  weather?: IWeatherResponse;
}

// initial state
const initialState: IWeatherState = {};

// contexts
const WeatherContextState = createContext<IWeatherState>(initialState);
const WeatherContextDispatch = createContext<IWeatherDispatch>({});

// custom consumer hooks
const useWeatherState = () => {
  const context: IWeatherState = useContext(WeatherContextState);
  if (context === undefined) {
    throw new Error('Your component is not wrapped inside VideoProvider');
  }

  const { weather, query } = context;

  return { weather, query };
};

// custom dispatcher
const useWeatherDispatch = () => {
  const context: IWeatherDispatch = useContext(WeatherContextDispatch);
  if (context === undefined) {
    throw new Error('Your component is not wrapped inside VideoProvider');
  }

  const { dispatch } = context;

  return dispatch;
};

const useTracker = (state: any, actions: any) => {
  return state;
};

const WeatherProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(useTracker, initialState);

  return (
    <WeatherContextState.Provider value={state}>
      <WeatherContextDispatch.Provider value={{ dispatch }}>
        {children}
      </WeatherContextDispatch.Provider>
    </WeatherContextState.Provider>
  );
};

export { WeatherProvider, useWeatherState, useWeatherDispatch };
