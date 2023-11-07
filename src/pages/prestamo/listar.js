import React, { useState, useEffect } from 'react';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
    Grid,
    Table,
    IconButton,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Stack,
} from '@mui/material';
import { buscar_prestamos } from '../../api/buscar_prestamos.ts';
import { eliminar_prestamo } from '../../api/eliminar_prestamo.ts';
import EditarPrestamo from './editar_prestamo';

const Lista_prestamos = () => {
    const [buscar_prestamosData, setbuscar_prestamosData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); 
    const [prestamoSeleccionado, setSelectedPrestamo] = useState(null);

    useEffect(() => {
        buscar_prestamos()
            .then((data) => {
                setbuscar_prestamosData(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarPrestamo = (id) => {
        eliminar_prestamo(id)
            .then(() => {
                // Después de eliminar el préstamo, puedes volver a cargar la lista
                buscar_prestamos()
                    .then((data) => setbuscar_prestamosData(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    const handleEditarPrestamo = (prestamo) => {
        setSelectedPrestamo(prestamo);
        setModalOpen(true);
    };

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
                        <TableCell>Eliminar préstamo</TableCell>
                        <TableCell>Editar préstamo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buscar_prestamosData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell> {item.implementos[0] ? item.implementos[0].nombre : 'N/A'}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_inicio).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(item.fecha_fin).toLocaleTimeString()}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEliminarPrestamo(item._id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEditarPrestamo(item)}>
                                    <EditOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <EditarPrestamo
                prestamo={prestamoSeleccionado}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

        </Grid>
    );
};

export default Lista_prestamos;
