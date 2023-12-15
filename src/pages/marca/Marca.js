// MARCA.js
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
import { crearmarca, eliminar_marca, obtenermarca } from '../../api/marca.ts';
import EditarMarcaModal from './modal.js'; // Adjust the path accordingly

const MARCA = () => {
    const [marca, setMarca] = useState([]);
    const [nuevaMarca, setNuevaMarca] = useState({
        nombre: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

    const cargarMarca = () => {
        obtenermarca()
            .then((data) => setMarca(data))
            .catch((error) => console.error('Error al obtener marca:', error));
    };

    useEffect(() => {
        cargarMarca();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaMarca({ ...nuevaMarca, [name]: value });
    };

    const handleCrearMarca = () => {
        crearmarca(nuevaMarca)
            .then((response) => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevaMarca({ nombre: '' });
                cargarMarca();
                window.location.reload();
            })
            .catch((error) => console.error('Error al crear marca:', error.message));
    };

    const handleEliminarMarca = (id) => {
        eliminar_marca(id)
            .then(() => cargarMarca())
            .catch((error) => console.error('Error al eliminar marca:', error));
    };

    const handleEditarMarca = (marca) => {
        setMarcaSeleccionada(marca);
        setModalOpen(true);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center>
                        <h2>Crear marca </h2>
                    </center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevaMarca.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearMarca}>
                                Crear marca
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
                        {marca.map((marca) => (
                            <TableRow key={marca._id}>
                                <TableCell></TableCell>
                                <TableCell>{marca.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarMarca(marca._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarMarca(marca)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarMarcaModal
                marca={marcaSeleccionada}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onMarcaActualizado={() => cargarMarca()}
            />
        </>
    );
};

export default MARCA;
