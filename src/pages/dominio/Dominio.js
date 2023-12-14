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
import { DeleteOutline } from '@mui/icons-material';
import { creardominio, eliminar_dominio, obtenerdominio } from '../../api/dominio.ts';

const DOMINIO = () => {

    const [dominio, setDominio] = useState([]);
    const [nuevadominio, setNuevadominio] = useState({
        nombre: '',
    });

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
    };

    const handleEliminardominio = (id) => {
        eliminar_dominio(id)
            .then(() => cargardominio())
            .catch(error => console.error('Error al eliminar dominio:', error));
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
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dominio.map((dominio) => (
                            <TableRow key={dominio._id}>
                                <TableCell></TableCell>
                                <TableCell>{dominio.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminardominio(dominio._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </>
    );
};

export default DOMINIO;