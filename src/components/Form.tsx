import React, { useState } from 'react';

const Form: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleFormSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log('handle form submit');
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
