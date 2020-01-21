import { IWeatherState } from 'interfaces';
import { SET_QUERY, SET_VALUE } from 'types';
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
    case SET_VALUE:
      return {
        ...state,
        weather: actions.payload
      };
    default:
      return state;
  }
};
