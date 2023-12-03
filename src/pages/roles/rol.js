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

import { CrearRol, eliminar_Rol } from '../../api/rol.ts';
import { obtenerRol } from '../../api/obtenerRol.ts';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import EditarRolModal from './editar_rol_modal.js';

const Rol = () => {
    const [roles, setRoles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [RolSeleccionado, setRolSeleccionado] = useState(null);
    const [nuevoRol, setNuevoRol] = useState({
        nombre: '',
        privilegio: 0,
        duracion_prestamo: 1,
    });
    const [contadorRol, setContadorRol] = useState(0);

    useEffect(() => {
        obtenerRol()
            .then((data) => {
                setRoles(data);
                setContadorRol(data.length);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarRol = (id) => {
        eliminar_Rol(id)
            .then(() => {
                obtenerRol()
                    .then((data) => {
                        setRoles(data);
                        setContadorRol(data.length);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    const handleEditarRol = (rol) => {
        setRolSeleccionado(rol);
        setModalOpen(true);
    };

    const handleChangeNuevoRol = (e) => {
        const { name, value } = e.target;
        setNuevoRol({ ...nuevoRol, [name]: value });
    };

    const handleCrearRol = () => {
        const nuevoPrivilegio = contadorRol + 1;

        CrearRol({ ...nuevoRol, privilegio: nuevoPrivilegio })
            .then(() => {
                obtenerRol()
                    .then((data) => {
                        setRoles(data);
                        setContadorRol(data.length);
                    })
                    .catch((error) => console.error(error));

                setNuevoRol({
                    nombre: '',
                    privilegio: nuevoPrivilegio + 1,
                    duracion_prestamo: 1,
                });
            })
            .catch((error) => console.error(error));
        console.log(nuevoRol);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear roles</h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevoRol.nombre}
                                onChange={handleChangeNuevoRol}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearRol}>
                                Crear Rol
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
                        {roles.map((rol) => (
                            <TableRow key={rol._id}>
                                <TableCell></TableCell>
                                <TableCell>{rol.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarRol(rol._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarRol(rol)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarRolModal
                rol={RolSeleccionado}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onRolActualizado={() => obtenerRol().then((data) => setRoles(data))}
            />
        </>
    );
};

export default Rol;
