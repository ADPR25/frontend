import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

import { buscar_prestamos_por_usuario } from '../../api/user_prestamo.ts';

const Prestamos = () => {
    const [prestamo, setPrestamo] = useState([]);

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
            buscar_prestamos_por_usuario(usuario)
                .then((data) => setPrestamo(data))
                .catch((error) => console.error(error));
        } else {
            console.error('No se encontró un token en el localStorage.');
        }
    }, []);

    return (
        <Grid container spacing={2}>
            {prestamo.map((prestamoItem) => (
                <Grid item key={prestamoItem._id} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                {`${prestamoItem.usuario.nombres} ${prestamoItem.usuario.apellidos}`}
                            </Typography>
                            <Typography>
                                <strong>Número de Documento:</strong> {prestamoItem.usuario.n_doc}
                            </Typography>
                            <Typography>
                                <strong>Fecha de Inicio:</strong>{' '}
                                {new Date(prestamoItem.fecha_inicio).toLocaleDateString()}{' '}
                                {new Date(prestamoItem.fecha_inicio).toLocaleTimeString()}
                            </Typography>
                            <Typography>
                                <strong>Fecha de Fin:</strong>{' '}
                                {new Date(prestamoItem.fecha_fin).toLocaleDateString()}{' '}
                                {new Date(prestamoItem.fecha_fin).toLocaleTimeString()}
                            </Typography>
                            {prestamoItem.implementos.map((implemento) => (
                                <div key={implemento._id}>
                                    <Typography>
                                        <strong>Nombre del implemento:</strong> {implemento.nombre}
                                    </Typography>
                                    <Typography>
                                        <strong>Marca:</strong> {implemento.marca.nombre}
                                    </Typography>
                                    <Typography>
                                        <strong>Descripción:</strong> {implemento.descripcion.detalles}
                                    </Typography>
                                    <Typography>
                                        <strong>Categoría:</strong> {implemento.categoria[0].nombre}
                                    </Typography>
                                    <Typography>
                                        <strong>Cantidad disponible:</strong> {implemento.cantidad_disponible}
                                    </Typography>
                                    <Typography>
                                        <strong>Estado:</strong> {implemento.estado[0].estado[0].estado}
                                    </Typography>
                                    {/* Puedes seguir agregando más detalles aquí */}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Prestamos;
