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
import { crearestadoImplemento, eliminar_estadoImplemento, obtenerestadoImplemento } from '../../api/estadoImplemento.ts';
import EditarEstadoImplementoModal from './editar.js';

const EstadoImplemento = () => {
    const [estadoImplemento, setEstadoImplemento] = useState([]);
    const [nuevaEstadoImplemento, setNuevaEstadoImplemento] = useState({
        estado: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [estadoImplementoSeleccionado, setEstadoImplementoSeleccionado] = useState(null);

    const cargarestadoImplemento = () => {
        obtenerestadoImplemento()
            .then(data => setEstadoImplemento(data))
            .catch(error => console.error('Error al obtener estado implemento:', error));
    };

    useEffect(() => {
        cargarestadoImplemento();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaEstadoImplemento({ ...nuevaEstadoImplemento, [name]: value });
    };

    const handleCrearestadoImplemento = () => {
        crearestadoImplemento(nuevaEstadoImplemento)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevaEstadoImplemento({ estado: '' });
                cargarestadoImplemento();
                window.location.reload();
            })
            .catch(error => console.error('Error al crear estado implemento:', error.message));
    };

    const handleEliminarestadoImplemento = (id) => {
        eliminar_estadoImplemento(id)
            .then(() => cargarestadoImplemento())
            .catch(error => console.error('Error al eliminar estado implemento:', error));
    };

    const handleEditarEstadoImplemento = (estadoImplemento) => {
        setEstadoImplementoSeleccionado(estadoImplemento);
        setModalOpen(true);
    };

    const handleCerrarModal = () => {
        setModalOpen(false);
    };

    const handleEstadoImplementoActualizado = () => {
        cargarestadoImplemento();
        handleCerrarModal();
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear estado formacion</h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <OutlinedInput
                                id="estado"
                                type="text"
                                name="estado"
                                value={nuevaEstadoImplemento.estado}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearestadoImplemento}>
                                Crear estado
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
                            <TableCell>Estado</TableCell>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estadoImplemento.map((estadoImplementoItem) => (
                            <TableRow key={estadoImplementoItem._id}>
                                <TableCell></TableCell>
                                <TableCell>{estadoImplementoItem.estado}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarestadoImplemento(estadoImplementoItem._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarEstadoImplemento(estadoImplementoItem)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarEstadoImplementoModal
                estadoImplemento={estadoImplementoSeleccionado}
                open={modalOpen}
                onClose={handleCerrarModal}
                onEstadoImplementoActualizado={handleEstadoImplementoActualizado}
            />
        </>
    );
};

export default EstadoImplemento;
