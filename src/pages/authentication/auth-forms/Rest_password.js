import React, { useState } from 'react';
import { activacion } from '../../../api/recuperacion.ts';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Button,
} from '@mui/material';

const Restablecer  = () => {
    const [activa, setActiva] = useState({
        codigo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActiva({ ...activa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await activacion(activa);

            if (response.status === 201) { 
                setActiva({
                    codigo: '',
                });
            } else {
                // Handle error here if needed
            }
        } catch (error) {
            // Handle error here if needed
            console.error(error);
        }
    };
   
    return (
        <form onSubmit={handleSubmit}>
            <center>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="codigo">Ingresa tu correo institucional</InputLabel>
                            <OutlinedInput
                                id="codigo"
                                type="string"
                                name="codigo"
                                fullWidth
                                value={activa.codigo}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                Recuperar Contraseña
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </center>
        </form>
    );
};

export default Restablecer;
