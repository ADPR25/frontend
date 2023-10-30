import React, { useState, useEffect } from 'react';
import {
    Grid, Table, TableHead, TableBody, TableRow, TableCell, Stack, 
} from '@mui/material';
// import { DeleteOutline } from '@mui/icons-material';
import { buscar_prestamos } from '../../api/buscar_prestamos.ts';
// import { eliminar_prestamo } from '../../api/eliminar_prestamo.ts';

const Lista_prestamos = () => {
    const [buscar_prestamosData, setbuscar_prestamosData] = useState([]);

    useEffect(() => {
        // Llama a la función de API para obtener los datos del inventario
        buscar_prestamos()
            .then((data) => {
                // console.log(data); 
                setbuscar_prestamosData(data);
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
                        <TableCell>Implemento</TableCell>
                        <TableCell>Fecha de inicio</TableCell>
                        <TableCell>Hora de inicio</TableCell>
                        <TableCell>Fecha final</TableCell>
                        <TableCell>Hora final</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buscar_prestamosData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.implementos[0].nombre}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleTimeString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid>
    );
};

export default Lista_prestamos;
