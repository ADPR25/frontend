import React, { useState } from 'react';
import { activar } from '../../../api/activacion.ts';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Button,
} from '@mui/material';

const Activation_acount = () => {
    const [activacion, setCodigo] = useState({
        codigo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCodigo({ ...activacion, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await activar(activacion);

            if (response.status === 201) { 
                setCodigo({
                    codigo: '',
                });
            } else {
                setError('codigo incorrecto');
            }
        } catch (error) {
            setError('Error al enviar el codigo');
            console.error(error);
        }
    };
   
    return (
        <form onSubmit={handleSubmit}>
            <center>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="codigo">Ingrese el codigo que le llego al correo sena <br /> para activar la cuenta</InputLabel>
                            <OutlinedInput
                                id="codigo"
                                type="string"
                                name="codigo"
                                fullWidth
                                value={activacion.codigo}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <Grid item xs={15} md={15}>
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
