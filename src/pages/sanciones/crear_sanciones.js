import React from 'react';
import {
    Grid,
    Stack,
   InputLabel,
   OutlinedInput,
} from '@mui/material';

const Crear_sanciones = () => {
    return (
        <form>
            <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="descripicion">Descripcion</InputLabel>
                        <OutlinedInput
                            id="descripcion"
                            type="string"
                            name="descripcion"
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default Crear_sanciones;
