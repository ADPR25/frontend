import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoCompleteInput = ({ id, name, label, options, value, inputValue, onInputChange, onChange }) => {
    return (
        <div>
            <label >{label}</label>
            <Autocomplete
                id={id}
                name={name}
                options={options}
                getOptionLabel={(option) => option.label || ''}
                value={value}
                inputValue={inputValue}
                onInputChange={onInputChange}
                className='auto'
                onChange={(_, newValue) => onChange({ target: { name, value: newValue } })}
                renderInput={(params) => <TextField {...params} variant="outlined" disabled={false} />}
                isOptionEqualToValue={(option, value) => option.value === value.value}
            />
        </div>
    );
};

export default AutoCompleteInput;
