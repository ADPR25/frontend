import React, { useState } from 'react';
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from '@mui/material';

const Activation_acount = () => {
    // Define state variable for the number input
    const [numberValue, setNumberValue] = useState('');

    // Define handleChange function to update the state when a number is entered
    const handleChange = (event) => {
        const inputValue = event.target.value;
        
        // Use a regular expression to allow only numbers
        const numericValue = inputValue.replace(/\D/g, '');

        // Update the state with the numeric value
        setNumberValue(numericValue);
    };

    // Define handleSubmit function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="numberInput">Enter a Number:</label>
                <input
                    id="numberInput"
                    type="text"
                    name="numberInput"
                    value={numberValue}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit</button> {/* Add a submit button */}
        </form>
    );
};

export default Activation_acount;
