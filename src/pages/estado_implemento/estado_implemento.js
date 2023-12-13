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
import { crearestadoImplemento, eliminar_estadoImplemento, obtenerestadoImplemento } from '../../api/estadoImplemento.ts';

const EstadoImplemento= () => {
    const [estadoImplemento, setestadoImplemento] = useState([]);
    const [nuevaestadoImplemento, setNuevaestadoImplemento] = useState({
        estado: '',
    });

    const cargarestadoImplemento = () => {
        obtenerestadoImplemento()
            .then(data => setestadoImplemento(data))
            .catch(error => console.error('Error al obtener jornada:', error));
    };

    useEffect(() => {
        cargarestadoImplemento();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaestadoImplemento({ ...nuevaestadoImplemento, [name]: value });
    };

    const handleCrearestadoImplemento = () => {
        crearestadoImplemento(nuevaestadoImplemento)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevaestadoImplemento({ codigo: '' });
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear estado formacion </h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <OutlinedInput
                                id="estado"
                                type="text"
                                name="estado"
                                value={nuevaestadoImplemento.estado}
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
                            <TableCell>Estado</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estadoImplemento.map((estadoImplemento) => (
                            <TableRow key={estadoImplemento._id}>
                                <TableCell></TableCell>
                                <TableCell>{estadoImplemento.estado}</TableCell>
                                <TableCell>
                                    {/* Fix the typo here, change 'jornada' to 'estadoImplemento' */}
                                    <IconButton onClick={() => handleEliminarestadoImplemento(estadoImplemento._id)}>
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

export default EstadoImplemento;
