import React, { useState, useEffect } from 'react';
import {
    Grid, Table, TableHead, TableBody, TableRow, TableCell,Stack,} from '@mui/material';
import { inventario } from '../../api/inventario.ts';

const Inventario = () => {
    const [inventarioData, setInventarioData] = useState([]);

    useEffect(() => {
        // Llama a la función de API para obtener los datos del inventario
        inventario()
            .then((data) => {
                console.log(data); // Verifica los datos en la consola
                setInventarioData(data)
            })
            .catch((error) => console.error(error));
    }, []);

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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid>
    );
};

export default Inventario;
