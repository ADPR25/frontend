import React, { useState, useEffect } from 'react';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { buscar_sanciones } from '../../api/obtenersanciones.ts'; // Importa la función de búsqueda
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import EditarSancionModal from './editar_sancion_modal.js'; // Importa el componente Modal de edición
import { eliminar_sancion } from '../../api/eliminar_sancion.ts'; // Importa la función para eliminar sanción

const Listar_sanciones = () => {
    const [sanciones, setSanciones] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [sancionSeleccionada, setSancionSeleccionada] = useState(null);

    useEffect(() => {
        // Realiza la solicitud a la API y actualiza el estado con los resultados
        buscar_sanciones()
            .then((data) => setSanciones(data))
            .catch((error) => console.error(error));
    }, []);

    const handleEliminarSancion = (id) => {
        eliminar_sancion(id)
            .then(() => {
                // Actualiza la lista de sanciones después de eliminar
                buscar_sanciones()
                    .then((data) => setSanciones(data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    const handleEditarSancion = (sancion) => {
        setSancionSeleccionada(sancion);
        setModalOpen(true);
    };

    return (
        <>
            <Grid container spacing={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Número de Documento</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción de la Sanción</TableCell>
                        <TableCell>Duracion</TableCell>
                        <TableCell>Acciones</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sanciones.map((sancion) => (
                        <TableRow key={sancion._id}>
                            <TableCell>{sancion.usuario && sancion.usuario.n_doc}</TableCell>
                            <TableCell>
                                {sancion.usuario && `${sancion.usuario.nombres} ${sancion.usuario.apellidos}`}
                            </TableCell>
                            <TableCell>{sancion.description}</TableCell>
                            <TableCell>{sancion.duracion}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEliminarSancion(sancion._id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEditarSancion(sancion)}>
                                    <EditOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Grid><EditarSancionModal
                sancion={sancionSeleccionada}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onGuardar={(sancionEditada) => {
                    // Lógica para guardar la sanción editada
                    console.log('Sanción editada:', sancionEditada);
                }} />
        </>
    );
};

export default Listar_sanciones;
