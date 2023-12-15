// EditarDominioModal.js
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { actualizardominio } from '../../api/dominio.ts';

const EditarDominioModal = ({ dominio, open, onClose, onDominioActualizado }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (dominio) {
            setNombre(dominio.nombre || '');
        }
    }, [dominio]);

    const handleGuardar = () => {
        const nuevoDominio = { nombre: nombre };
        actualizardominio(dominio._id, nuevoDominio)
            .then(dominioActualizado => {
                onDominioActualizado(dominioActualizado);
                onClose();
            })
            .catch(error => {
                console.error('Error al actualizar el dominio:', error);
            });
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Dominio</DialogTitle>
            <DialogContent>
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

export default EditarDominioModal;
