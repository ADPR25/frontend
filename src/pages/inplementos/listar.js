import React, { useState, useEffect } from 'react';
import {
    Grid, Button, Table, TableHead, TableBody, TableRow, TableCell, Stack, IconButton
} from '@mui/material';
import { inventario } from '../../api/inventario.ts';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CrearImplementoModal from './CrearImplementoModal.js';
import { eliminarImplemento } from '../../api/eliminar_inpl.ts'
import EditarImplementoModal from './editar_implemento_modal.js';

const Inventario = () => {

    const [implementoselecciomnado, setimplementoselecciomnado] = useState(null);
    const [ setimplemento] = useState([]);
    const [crearModalOpen, setCrearModalOpen] = useState(false);
    const [editarModalOpen, setEditarModalOpen] = useState(false);

    const handleCrear = () => {
        setCrearModalOpen(true);
        setEditarModalOpen(false);
    };

    const handleEditarImplemento = (implemento) => {
        setimplementoselecciomnado(implemento);
        setEditarModalOpen(true);
        setCrearModalOpen(false);
    };

    useEffect(() => {
        inventario()
            .then((data) => setimplemento(data))
            .catch((error) => console.error(error));
    }, []);

    const [inventarioData, setInventarioData] = useState([]);

    useEffect(() => {
        inventario()
            .then((data) => {
                setInventarioData(data)
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarImplemento = (id) => {
        eliminarImplemento(id)
            .then(() => {
                setInventarioData(inventarioData.filter((item) => item._id !== id));
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Stack spacing={7}></Stack>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Cantidad Nuevo</TableCell>
                            <TableCell>Cantidad Malos</TableCell>
                            <TableCell>Cantidad Disponible</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventarioData.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.marca && item.marca.nombre}</TableCell>
                                <TableCell>{item.categoria[0] && item.categoria[0].nombre}</TableCell>
                                <TableCell>{item.estado[0] && item.estado[0].cantidad}</TableCell>
                                <TableCell>{item.estado[2] && item.estado[2].cantidad}</TableCell>
                                <TableCell>{item.estado[1] && item.estado[1].cantidad}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarImplemento(item)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarImplemento(item._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Grid item xs={12} md={12}>
                    <center>
                        <Button variant="contained" color="primary" onClick={handleCrear}>
                            <AddIcon />
                        </Button>
                    </center>
                </Grid>
                <CrearImplementoModal open={crearModalOpen} onClose={() => setCrearModalOpen(false)} />
                <EditarImplementoModal
                    implemento={implementoselecciomnado}
                    open={editarModalOpen}
                    onClose={() => setEditarModalOpen(false)}
                />
            </Grid>
        </>
    );
};

export default Inventario;
