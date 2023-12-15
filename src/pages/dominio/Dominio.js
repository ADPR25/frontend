import React, { useState, useEffect } from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Stack,
    InputLabel,
    OutlinedInput,
    Button,
} from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import { creardominio, eliminar_dominio, obtenerdominio } from '../../api/dominio.ts';
import EditarDominioModal from './modal.js';

const DOMINIO = () => {
    const [dominio, setDominio] = useState([]);
    const [nuevadominio, setNuevadominio] = useState({
        nombre: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [dominioSeleccionado, setDominioSeleccionado] = useState(null);

    const cargardominio = () => {
        obtenerdominio()
            .then(data => setDominio(data))
            .catch(error => console.error('Error al obtener dominio:', error));
    };

    useEffect(() => {
        cargardominio();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevadominio({ ...nuevadominio, [name]: value });
    };

    const handleCreardominio = () => {
        creardominio(nuevadominio)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevadominio({ nombre: '' });
                cargardominio();
                window.location.reload();
            })
            .catch(error => console.error('Error al crear dominio:', error.message));
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleEliminardominio = (id) => {
        eliminar_dominio(id)
            .then(() => cargardominio())
            .catch(error => console.error('Error al eliminar dominio:', error));
    };

    const handleAbrirModal = (dominio) => {
        setDominioSeleccionado(dominio);
        setModalOpen(true);
    };

    const handleCerrarModal = () => {
        setDominioSeleccionado(null);
        setModalOpen(false);
    };

    const handleGuardarEdicion = (dominioActualizado) => {
        const dominioActualizadoLista = dominio.map(d => (d._id === dominioActualizado._id ? dominioActualizado : d));
        setDominio(dominioActualizadoLista);
        handleCerrarModal();
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear dominio</h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevadominio.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCreardominio}>
                                Crear dominio
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dominio.map((dominio) => (
                            <TableRow key={dominio._id}>
                                <TableCell>{dominio.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminardominio(dominio._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleAbrirModal(dominio)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarDominioModal
                dominio={dominioSeleccionado}
                open={modalOpen}
                onClose={handleCerrarModal}
                onDominioActualizado={handleGuardarEdicion}
            />
        </>
    );
};

export default DOMINIO;
