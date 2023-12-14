import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

import { buscar_sanciones_por_usuario } from '../../api/user_sancion.ts';

const Sancion = () => {
    const [sanciones, setSanciones] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let usuario = '';

        try {
            const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
            usuario = tokenData.id || '';
        } catch (error) {
            console.error('Error al parsear el token:', error);
        }
        if (token) {
            buscar_sanciones_por_usuario(usuario)
                .then((data) => setSanciones(data))
                .catch((error) => console.error(error));
        } else {
            console.error('No se encontró un token en el localStorage.');
        }
    }, []);

    return (
        <Grid container spacing={2}>
            {sanciones.map((sancion) => (
                <Grid item key={sancion._id} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                {sancion.usuario && sancion.usuario.nombres} {sancion.usuario && sancion.usuario.apellidos}
                            </Typography>
                            <Typography>
                                <strong>Número de Documento:</strong> {sancion.usuario && sancion.usuario.n_doc}
                            </Typography>
                            <Typography>
                                <strong>Descripción de la Sanción:</strong> {sancion.description}
                            </Typography>
                            <Typography>
                                <strong>Duración:</strong> {sancion.duracion} horas
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Sancion;

