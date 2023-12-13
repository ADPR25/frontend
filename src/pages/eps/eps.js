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
import { obtenerEPS } from '../../api/obtenerEps.ts'; // Importa las funciones necesarias desde tu archivo de API
import {  creareps, eliminar_eps } from '../../api/eps.ts'; // Importa las funciones necesarias desde tu archivo de API


const EPS = () => {
    const [eps, setEps] = useState([]);
    const [nuevaEps, setNuevaEps] = useState({
        nombre: '',
    });

    const cargarEps = () => {
        obtenerEPS()
            .then(data => setEps(data))
            .catch(error => console.error('Error al obtener EPS:', error));
    };

    useEffect(() => {
        cargarEps();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaEps({ ...nuevaEps, [name]: value });
    };

    const handleCrearEps = () => {
        creareps(nuevaEps)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error); 
                }
                setNuevaEps({ nombre: '' });
                cargarEps();
            })
            .catch(error => console.error('Error al crear EPS:', error.message));
        window.location.reload();
    };

    const handleEliminarEps = (id) => {
        eliminar_eps(id)
            .then(() => cargarEps())
            .catch(error => console.error('Error al eliminar EPS:', error));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear eps</h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevaEps.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearEps}>
                                Crear Eps
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
                        {eps.map((eps) => (
                            <TableRow key={eps._id}>
                                <TableCell></TableCell>
                                <TableCell>{eps.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarEps(eps._id)}>
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

export default EPS;
