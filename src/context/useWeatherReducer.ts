import { IWeatherState } from 'interfaces';
import { SET_QUERY, GET_FORECAST, FETCH_FAILED, FETCH_REQUESTED } from 'types';
interface IActions {
  type: string;
  payload: any;
}

export default (state: IWeatherState, actions: IActions) => {
  switch (actions.type) {
    case SET_QUERY:
      return {
        ...state,
        query: actions.payload
      };
    case GET_FORECAST:
      return {
        ...state,
        fetchFailed: false,
        fetchRequested: false,
        weather: actions.payload
      };
    case FETCH_REQUESTED:
      return {
        ...state,
        fetchRequested: true
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        weather: {}
      };
    default:
      return state;
  }
};
