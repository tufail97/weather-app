import React, { useState } from 'react';
import { Tracker } from 'services';
import { IWeatherState } from 'interfaces';
import { useWeatherState } from 'context/weatherContext';
import './index.css';

const Panel: React.FC = () => {
  const [currentTab, setTab] = useState('DAY');
  const tracker = new Tracker();
  const state: IWeatherState = useWeatherState();

  tracker.setValue(state);

  const getDom = () => {
    let values = {
      min: 0,
      max: 0,
      mean: 0,
      mode: 0
    };
    if (currentTab === 'DAY') {
      values = {
        min: tracker.getMin()!.day,
        max: tracker.getMax()!.day,
        mean: tracker.getMean()!.day,
        mode: tracker.getMode()!.day
      };
    } else if (currentTab === 'NIGHT') {
      values = {
        min: tracker.getMin()!.night,
        max: tracker.getMax()!.night,
        mean: tracker.getMean()!.night,
        mode: tracker.getMode()!.night
      };
    } else {
      values = {
        min: tracker.getMin()!.humidity,
        max: tracker.getMax()!.humidity,
        mean: tracker.getMean()!.humidity,
        mode: tracker.getMode()!.humidity
      };
    }

    return (
      <>
        <div>
          <span className='label'>Min:</span>
          <span className='data'>{values.min}</span>
        </div>
        <div>
          <span className='label'>Max:</span>
          <span className='data'>{values.max}</span>
        </div>
        <div>
          <span className='label'>Mean:</span>
          <span className='data'>{values.min}</span>
        </div>
        <div>
          <span className='label'>Mode:</span>
          <span className='data'>{values.mode}</span>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className='panel-wrapper'>
        <div
          className={`${currentTab === 'DAY' ? 'active' : ''} tab`}
          onClick={() => setTab('DAY')}
        >
          Day
        </div>
        <div
          className={`${currentTab === 'NIGHT' ? 'active' : ''} tab`}
          onClick={() => setTab('NIGHT')}
        >
          Night
        </div>
        <div
          className={`${currentTab === 'HUMIDITY' ? 'active' : ''} tab`}
          onClick={() => setTab('HUMIDITY')}
        >
          Humidity
        </div>
      </div>
      <div className='values'>{getDom()}</div>
    </div>
  );
};

export default Panel;
