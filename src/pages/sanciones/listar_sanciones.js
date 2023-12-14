import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import EditarSancionModal from './editar_sancion_modal.js';
import { eliminar_sancion } from '../../api/eliminar_sancion.ts';
import { buscar_sanciones } from '../../api/obtenersanciones.ts';

const Listar_sanciones = () => {
    const [sanciones, setSanciones] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [sancionSeleccionada, setSancionSeleccionada] = useState(null);

    useEffect(() => {
        buscar_sanciones()
            .then((data) => setSanciones(data))
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarSancion = (id) => {
        eliminar_sancion(id)
            .then(() => {
                buscar_sanciones()
                    .then((data) => setSanciones(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    const handleEditarSancion = (sancion) => {
        setSancionSeleccionada(sancion); // Pasa la sanción completa
        setModalOpen(true);
    };

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
                                <strong>Duración:</strong> {sancion.duracion}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleEliminarSancion(sancion._id)}>
                                <DeleteOutline />
                            </IconButton>
                            <IconButton onClick={() => handleEditarSancion(sancion)}>
                                <EditOutlined />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            <EditarSancionModal
                sancion={sancionSeleccionada}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </Grid>
    );
};

export default Listar_sanciones;
