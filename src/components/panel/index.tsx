import React from 'react';
import { Tracker } from 'services';
import { IWeatherState } from 'interfaces';
import { useWeatherState } from 'context/weatherContext';

const Panel: React.FC = () => {
  const tracker = new Tracker();
  const state: IWeatherState = useWeatherState();

  tracker.setValue(state);

  console.log('min --->', tracker.getMin());
  console.log('max --->', tracker.getMax());
  console.log('mean --->', tracker.getMean());
  console.log('mode --->', tracker.getMode());

  return <div>panel</div>;
};

export default Panel;
