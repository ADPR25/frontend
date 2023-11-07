import React, { useState, useEffect } from 'react';
import {
    Grid,
    Stack,
    InputLabel,
    OutlinedInput,
    TextareaAutosize, // Importa TextareaAutosize para el campo de descripción
    Button, // Importa Button para el botón de envío
} from '@mui/material';

import { Sancionar } from '../../api/crear_sancion.ts';
import { buscar_sancionado } from '../../api/buscar.ts';

const CrearSanciones = () => {

    const [dias, setDias] = useState(0);
    const [horas, setHoras] = useState(0);
    const [usuario, setUsuario] = useState({
        correo: '',
        description: '', // Corrige el nombre del campo 'description'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = await buscar_sancionado({
                correo: usuario.correo,
            });

            if (userId) {
                const response = await Sancionar({
                    usuario: userId, 
                    description: usuario.description,
                    duracion: horas,
                    estado: true,
                });

                if (response) {
                    // Realiza la lógica que corresponda cuando la sanción se completa con éxito
                    console.log('Sanción exitosa');
                    setUsuario({
                        correo: '',
                        description: '',
                    });
                } else {
                    console.error('Error en la sanción:', response);
                }
            } else {
                console.error('No se encontró al usuario');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setHoras(dias * 24);
    }, [dias]);

    const handleDiasChange = (e) => {
        setDias(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="correo_inst">Correo de la persona a sancionar</InputLabel>
                        <OutlinedInput
                            id="correo_inst"
                            type="email"
                            name="correo"
                            value={usuario.correo}
                            onChange={handleChange}
                            placeholder='Correo de la persona a sancionar'
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="Dias">Días</InputLabel>
                        <OutlinedInput
                            id="Dias"
                            type="number"
                            placeholder='Días a sancionar'
                            name="dias"
                            fullWidth
                            value={dias}
                            onChange={handleDiasChange}
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                        <TextareaAutosize
                            
                            id="descripcion"
                            name="description"
                            minRows={4}
                            value={usuario.description}
                            onChange={handleChange}
                            placeholder='Descripción de la sanción'
                            style={{ width: '100%', height: '250px' }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                    <center>
                        <Button type="submit" variant="contained" color="primary">Enviar</Button>
                    </center>
                </Grid>
            </Grid>
        </form>
    );
};

export default CrearSanciones;
