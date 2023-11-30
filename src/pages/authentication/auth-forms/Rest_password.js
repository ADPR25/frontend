import React, { useState } from 'react';
import { activacion } from '../../../api/recuperacion.ts';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Button,
} from '@mui/material';

const Restablecer = () => {
    const [activa, setActiva] = useState({
        correo: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActiva({ ...activa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const correo = activa.correo; 
            const response = await activacion({ correo });

            if (response.status === 201) {
                setActiva({
                    correo: '',
                });
            } else {
                console.error('Error occurred');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <center>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="correo">Ingresa tu correo institucional</InputLabel>
                            <OutlinedInput
                                id="correo"
                                type="email"
                                name="correo" 
                                fullWidth
                                value={activa.correo} 
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
