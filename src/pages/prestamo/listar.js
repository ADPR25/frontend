import React, { useState, useEffect } from 'react';
import {
    Grid, Table, TableHead, TableBody, TableRow, TableCell, Stack, IconButton
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { buscar_prestamos } from '../../api/buscar_prestamos.ts';
import { eliminar_prestamo } from '../../api/eliminar_prestamo.ts';

const Lista_prestamos = () => {
    const [buscar_prestamosData, setbuscar_prestamosData] = useState([]);

    const eliminar_prestamo__ = (id) => {
        eliminar_prestamo(id)
            .then(() => {
                buscar_prestamos()
                    .then((data) => {
                        setbuscar_prestamosData(data);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        // Llama a la función de API para obtener los datos del inventario
        buscar_prestamos()
            .then((data) => {
                console.log(data); // Verifica los datos en la consola
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
                        <TableCell>Fecha de inicio del prestamo</TableCell>
                        <TableCell>Fecha final del prestamo</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buscar_prestamosData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.implementos}</TableCell>
                            <TableCell>{item.fecha_inicio}</TableCell>
                            <TableCell>{item.fecha_fin}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => eliminar_prestamo__(item._id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid>
    );
};

export default Lista_prestamos;
