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
import { actualizarjornada } from '../../api/jornada.ts';

const EditarJornadaModal = ({ jornada, open, onClose, onJornadaActualizado }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (jornada) {
            setNombre(jornada.nombre || '');
        }
    }, [jornada]);

    const handleChange = (e) => {
        const { value } = e.target;
        setNombre(value);
    };
    

    const handleGuardar = () => {
        if (jornada && jornada._id) {
            const jornadaEditado = {
                nombre,
            };
            actualizarjornada(jornada._id, jornadaEditado)
                .then(() => {
                    console.log('Nombre del jornada editado con éxito');
                    onJornadaActualizado(); // Call the prop function here
                    onClose();
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Jornada </DialogTitle>
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

export default EditarJornadaModal;
