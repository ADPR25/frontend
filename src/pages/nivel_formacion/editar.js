import React, { useState } from 'react';
import {
    Grid,
    Stack,
    InputLabel,
    OutlinedInput,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Dialog
} from '@mui/material';
import { actualizarnivelFormacion } from '../../api/nivel_formacion.ts';

const EditarNivelFormacionModal = ({
    onClose,
    nivelFormacion,
    onUpdateNivelFormacion,
}) => {
    const [nivelFormacionEditado, setNivelFormacionEditado] = useState({
        nombre: '',
    });
    const [open] = useState(true); 
    if (!nivelFormacion) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNivelFormacionEditado({ ...nivelFormacionEditado, [name]: value });
    };

    const handleUpdateNivelFormacion = () => {
        actualizarnivelFormacion(nivelFormacion._id, nivelFormacionEditado)
            .then(() => {
                onUpdateNivelFormacion(nivelFormacion._id, nivelFormacionEditado);
                onClose();
            })
            .catch((error) => console.error('Error al actualizar nivel de formación:', error));

        setTimeout(() => {
            window.location.reload(); 
        }, 2000);
    };



    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Roles</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nivelFormacionEditado.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button type='submit' variant="contained" color="primary" onClick={handleUpdateNivelFormacion}>
                            Actualizar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Stack>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default EditarNivelFormacionModal;
