import React, { useState } from 'react';
import { useWeatherDispatch } from 'context/weatherContext';
import { SET_QUERY } from 'types';

const Form: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const dispatchAction = useWeatherDispatch();
  // update state on every input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  // on submit dispatch action to update the query in weather contedxt
  const handleFormSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (dispatchAction) {
      dispatchAction({ type: SET_QUERY, payload: query });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor='query'>City</label>
        <input
          name='query'
          onChange={handleInputChange}
          value={query}
          placeholder='Enter City'
        />
        <input type='Submit' value='Get Forecast' onChange={handleFormSubmit} />
      </div>
    </form>
  );
};

export default Form;
