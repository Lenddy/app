import { useState } from 'react';

function Test() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected option
    // ...

    //: Reset the form
    setSelectedOption('');
    event.target.reset();
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">--Select an option--</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}


export default Test