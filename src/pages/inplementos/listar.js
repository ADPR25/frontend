import React, { useState, useEffect } from 'react';
import {
    Grid, Button, Table, TableHead, TableBody, TableRow, TableCell, Stack, IconButton
} from '@mui/material';
import { inventario } from '../../api/inventario.ts';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CrearImplementoModal from './CrearImplementoModal.js';
import { eliminarImplemento } from '../../api/eliminar_inpl.ts'
const Inventario = () => {


    const [modalOpen, setModalOpen] = useState(false);
    const handlecrear = () => {
        setModalOpen(true);
    };

    const [inventarioData, setInventarioData] = useState([]);

    useEffect(() => {
        // Llama a la función de API para obtener los datos del inventario
        inventario()
            .then((data) => {
                // console.log(data);
                setInventarioData(data)
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarImplemento = (id) => {
        // Llama a la función de API para eliminar el implemento
        eliminarImplemento(id)
            .then(() => {
                // Si la eliminación es exitosa, actualiza los datos del inventario
                setInventarioData(inventarioData.filter((item) => item._id !== id));
            })
            .catch((error) => console.error(error));
    };
    

    return (
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
                    <Button variant="contained" color="primary">
                        <AddIcon onClick={handlecrear} />
                    </Button>
                </center>
            </Grid>
            <CrearImplementoModal open={modalOpen} onClose={() => setModalOpen(false)} />

        </Grid>
    );
};

export default Inventario;
