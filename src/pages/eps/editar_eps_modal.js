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
import { actualizareps } from '../../api/eps.ts';

const EditarEpsModal = ({ eps, open, onClose, onEpsActualizado }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (eps) {
            setNombre(eps.nombre || '');
        }
    }, [eps]);

    const handleChange = (e) => {
        const { value } = e.target;
        setNombre(value);
    };

    const handleGuardar = () => {
        if (eps && eps._id) {
            const epsEditado = {
                nombre,
            };
            actualizareps(eps._id, epsEditado)
                .then(() => {
                    console.log('Nombre del eps editado con éxito');
                    onEpsActualizado(); // Call the prop function here
                    onClose();
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Eps</DialogTitle>
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
                                onChange={handleChange}
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

export default EditarEpsModal;
