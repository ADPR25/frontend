// Listar_sanciones.js

import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { buscar_sanciones } from '../../api/obtenersanciones.ts';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import EditarSancionModal from './editar_sancion_modal.js';
import { eliminar_sancion } from '../../api/eliminar_sancion.ts';

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
        <>
            <Grid container spacing={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Número de Documento</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción de la Sanción</TableCell>
                            <TableCell>Duración</TableCell>
                            <TableCell>Acciones</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sanciones.map((sancion) => (
                            <TableRow key={sancion._id}>
                                <TableCell>{sancion.usuario && sancion.usuario.n_doc}</TableCell>
                                <TableCell>
                                    {sancion.usuario && `${sancion.usuario.nombres} ${sancion.usuario.apellidos}`}
                                </TableCell>
                                <TableCell>{sancion.description}</TableCell>
                                <TableCell>{sancion.duracion}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarSancion(sancion._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarSancion(sancion)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarSancionModal
                sancion={sancionSeleccionada}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default Listar_sanciones;
