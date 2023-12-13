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
import { crearmarca, eliminar_marca, obtenermarca } from '../../api/marca.ts';

const MARCA = () => {
    const [marca, setmarca] = useState([]);
    const [nuevamarca, setNuevamarca] = useState({
        nombre: '',
    });

    const cargarmarca = () => {
        obtenermarca()
            .then(data => setmarca(data))
            .catch(error => console.error('Error al obtener marca:', error));
    };

    useEffect(() => {
        cargarmarca();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevamarca({ ...nuevamarca, [name]: value });
    };

    const handleCrearmarca = () => {
        crearmarca(nuevamarca)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevamarca({ nombre: '' });
                cargarmarca();
                window.location.reload();
            })
            .catch(error => console.error('Error al crear marca:', error.message));
    };

    const handleEliminarmarca = (id) => {
        eliminar_marca(id)
            .then(() => cargarmarca())
            .catch(error => console.error('Error al eliminar marca:', error));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear marca </h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevamarca.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearmarca}>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marca.map((marca) => (
                            <TableRow key={marca._id}>
                                <TableCell></TableCell>
                                <TableCell>{marca.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarmarca(marca._id)}>
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

export default MARCA;