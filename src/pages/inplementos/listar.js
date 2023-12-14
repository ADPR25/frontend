import React, { useState, useEffect } from 'react';
import {
    Grid, Button, Card, CardContent, CardActions, Typography,  IconButton
} from '@mui/material';
import { inventario } from '../../api/inventario.ts';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CrearImplementoModal from './CrearImplementoModal.js';
import { eliminarImplemento } from '../../api/eliminar_inpl.ts'
import EditarImplementoModal from './editar_implemento_modal.js';

const Inventario = () => {
    const [implementoselecciomnado, setimplementoselecciomnado] = useState(null);
    const [inventarioData, setInventarioData] = useState([]);
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
            .then((data) => setInventarioData(data))
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
                {inventarioData.map((item) => (
                    <Grid item key={item._id} xs={12} md={6} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.nombre}</Typography>
                                <Typography>
                                    <strong>Marca:</strong> {item.marca && item.marca.nombre}
                                </Typography>
                                <Typography>
                                    <strong>Categoría:</strong> {item.categoria[0] && item.categoria[0].nombre}
                                </Typography>
                                <Typography>
                                    <strong>Cantidad Nuevo:</strong> {item.estado[0] && item.estado[0].cantidad}
                                </Typography>
                                <Typography>
                                    <strong>Cantidad Malos:</strong> {item.estado[2] ? item.estado[2].cantidad : 0}
                                </Typography>
                                <Typography>
                                    <strong>Cantidad Disponible:</strong> {item.estado[0] && item.estado[0].cantidad}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleEditarImplemento(item)}>
                                    <EditOutlined />
                                </IconButton>
                                <IconButton onClick={() => handleEliminarImplemento(item._id)}>
                                    <DeleteOutline />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
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
