interface ICity {
  id: number;
  name: string;
  country: string;
}

interface IList {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
}

export interface IWeatherResponse {
  city: ICity;
  cod: string;
  message: number | string;
  cnt: number;
  list: Array<IList>;
}

// global state
export interface IWeatherState {
  query?: string;
  weather?: IWeatherResponse;
  fetchRequested: boolean;
  fetchFailed: boolean;
}
