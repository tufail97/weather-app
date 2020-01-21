import { IWeatherState } from 'interfaces';

interface IActions {
  type: string;
  payload: any;
}

export default (state: IWeatherState, actions: IActions) => {
  switch (actions.type) {
    default:
      return state;
  }
};
