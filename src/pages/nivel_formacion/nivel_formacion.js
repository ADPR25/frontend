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
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { crearnivelFormacion, eliminar_nivelFormacion, obtenernivelFormacion } from '../../api/nivel_formacion.ts';
import EditarNivelFormacionModal from './editar.js';
 
const NivelFormacion = () => {
    const [editarModalOpen, setEditarModalOpen] = useState(false);
    const [nivelFormacionSeleccionado, setNivelFormacionSeleccionado] = useState(null);
    const [nivelFormacion, setnivelFormacion] = useState([]);
    const [nuevanivelFormacion, setNuevanivelFormacion] = useState({
        nombre: '',
    });

    const cargarnivelFormacion = () => {
        obtenernivelFormacion()
            .then(data => setnivelFormacion(data))
            .catch(error => console.error('Error al obtener jornada:', error));
    };

    useEffect(() => {
        cargarnivelFormacion();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevanivelFormacion({ ...nuevanivelFormacion, [name]: value });
    };

    const handleEditarModalOpen = (nivel) => {
        setNivelFormacionSeleccionado(nivel);
        setEditarModalOpen(true);
    };

    const handleEditarModalClose = () => {
        setNivelFormacionSeleccionado(null);
        setEditarModalOpen(false);
    };

    const handleUpdateNivelFormacion = (nivelFormacionId, nivelFormacionEditado) => {
        actualizarnivelFormacion(nivelFormacionId, nivelFormacionEditado)
            .then(() => {
                cargarnivelFormacion();
                handleEditarModalClose();
            })
            .catch((error) => console.error('Error al actualizar nivel de formación:', error));
    };

    const handleCrearnivelFormacion = () => {
        crearnivelFormacion(nuevanivelFormacion)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevanivelFormacion({ nombre: '' });
                cargarnivelFormacion();
                window.location.reload();
            })
            .catch(error => console.error('Error al crear jornada:', error.message));
    };

    const handleEliminarnivelFormacion = (id) => {
        eliminar_nivelFormacion(id)
            .then(() => cargarnivelFormacion())
            .catch(error => console.error('Error al eliminar jornada:', error));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear nivel formacion </h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevanivelFormacion.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearnivelFormacion}>
                                Crear jornada
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
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nivelFormacion.map((nivelFormacion) => (
                            <TableRow key={nivelFormacion._id}>
                                <TableCell></TableCell>
                                <TableCell>{nivelFormacion.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarnivelFormacion(nivelFormacion._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarModalOpen(nivelFormacion)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarNivelFormacionModal
                isOpen={editarModalOpen}
                onClose={() => {
                    handleEditarModalClose();
                }}
                nivelFormacion={nivelFormacionSeleccionado}
                onUpdateNivelFormacion={handleUpdateNivelFormacion}
            />
        </>
    );
};

export default NivelFormacion;
