import React, { useState } from 'react';
import { activacion } from '../../../api/activacion.ts';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Button,
} from '@mui/material';

const Activation_acount = () => {
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

            if (response.status === 202) {
                setActiva({
                    codigo: '',
                });
            } else {
                //h
            }
            alert("Se ha activado la cuenta");
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
                            <InputLabel htmlFor="codigo">Ingrese el código que le llegó al correo del Sena para activar la cuenta</InputLabel>
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
                                Activar cuenta
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </center>
        </form>
    );
};

export default Activation_acount;
