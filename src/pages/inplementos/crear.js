import React from 'react';
import {
    Grid,
    OutlinedInput,
    InputLabel,
    Stack,
} from '@mui/material';

const CrearInplementos = () => {
    return (
        <form>
            <Grid container spacing={2}>
                
                <Grid item xs={12} md={4}>
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

                <Grid item xs={12} md={8}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="N_informe">Numero de informes</InputLabel>
                        <OutlinedInput
                            id="N_informe"
                            type="string"
                            name="n_informe"
                            fullWidth
                            placeholder="numero de informes"
                            required
                        />
                    </Stack>
                </Grid>

                

            </Grid>
        </form>
    );
};

export default CrearInplementos;
