import React, { useState, useEffect } from 'react';
import { DeleteOutline, Close, DownloadDone } from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import { buscar_prestamos } from '../../api/buscar_prestamos.ts';
import { eliminar_prestamo } from '../../api/eliminar_prestamo.ts';
import { aprobar_prestamo } from '../../api/aprobar.ts';

const Lista_Prestamos = () => {
    const [buscarPrestamosData, setBuscarPrestamosData] = useState([]);

    useEffect(() => {
        buscar_prestamos()
            .then((data) => {
                setBuscarPrestamosData(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarPrestamo = (id) => {
        eliminar_prestamo(id)
            .then(() => {
                buscar_prestamos()
                    .then((data) => setBuscarPrestamosData(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    const handleAprobar = (id) => {
        aprobar_prestamo(id)
            .then(() => {
                buscar_prestamos()
                    .then((data) => setBuscarPrestamosData(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    return (
        <Grid container spacing={2}>
            {buscarPrestamosData.map((item) => (
                <Grid item key={item._id} xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                {item.implementos[0] ? item.implementos[0].nombre : 'N/A'}
                            </Typography>
                            <Typography>
                                <strong>Fecha de inicio:</strong>{' '}
                                {new Date(item.fecha_inicio).toLocaleDateString()}{' '}
                                {new Date(item.fecha_inicio).toLocaleTimeString()}
                            </Typography>
                            <Typography>
                                <strong>Fecha final:</strong>{' '}
                                {new Date(item.fecha_fin).toLocaleDateString()}{' '}
                                {new Date(item.fecha_fin).toLocaleTimeString()}
                            </Typography>
                            <Typography>
                                <strong>Estado del préstamo:</strong>{' '}
                                {item.estado && item.estado.nombre ? item.estado.nombre : 'N/A'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleEliminarPrestamo(item._id)}>
                                <DeleteOutline />
                            </IconButton>
                            <IconButton>
                                <Close />
                            </IconButton>
                            <IconButton onClick={() => handleAprobar(item._id)}>
                                <DownloadDone />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Lista_Prestamos;
