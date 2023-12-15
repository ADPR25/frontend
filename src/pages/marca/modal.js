// EditarMarcaModal.js
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Stack,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { actualizarMarca } from '../../api/marca.ts';

const EditarMarcaModal = ({ marca, open, onClose, }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (marca) {
            setNombre(marca.nombre || '');
        }
    }, [marca]);


    const handleGuardar = () => {
        const marcaActualizada = {
            nombre: nombre,
        };
        actualizarMarca(marca._id, marcaActualizada)
            .then((data) => {
                onClose();
                onMarcaActualizada(data);
            })
            .catch((error) => {
               console.error('Error al actualizar la marca', error);
            });
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Marca</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                name="nombre"
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleGuardar} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarMarcaModal;
