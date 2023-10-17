import React from 'react';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
} from '@mui/material';

const Mantenimiento = () => {

    return (
        <form>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                         <InputLabel htmlFor="fecha">Fecha</InputLabel>
                         <OutlinedInput 
                            id="fecha"
                            type="date"
                            name="fecha"
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default Mantenimiento;







