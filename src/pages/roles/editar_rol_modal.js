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
import { actualizarRol } from '../../api/rol.ts';

const EditarRolModal = ({ rol, open, onClose, onRolActualizado }) => {
    const [nombre, setNombre] = useState('');
    const [privilegio, setPrivilegio] = useState(0);
    const [duracionPrestamo, setDuracionPrestamo] = useState(0);

    useEffect(() => {
        if (rol) {
            setNombre(rol.nombre || '');
            setPrivilegio(rol.privilegio || 0);
            setDuracionPrestamo(rol.duracion_prestamo || 0);
        }
    }, [rol]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nombre') setNombre(value);
        else if (name === 'privilegio') setPrivilegio(value);
        else if (name === 'duracionPrestamo') setDuracionPrestamo(value);
    };

    const handleGuardar = () => {
        if (rol && rol._id) {
            const rolEditado = {
                nombre,
                privilegio,
                duracion_prestamo: duracionPrestamo,
            };
            actualizarRol(rol._id, rolEditado)
                .then(() => {
                    console.log('Rol editado con éxito');
                    onRolActualizado();
                    onClose();
                })
                .catch((error) => console.error(error));
        }
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
                                name="nombre"
                                fullWidth
                                value={nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="privilegio">Privilegio</InputLabel>
                            <OutlinedInput
                                id="privilegio"
                                name="privilegio"
                                type="number"
                                fullWidth
                                value={privilegio}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="duracionPrestamo">Duración de préstamo</InputLabel>
                            <OutlinedInput
                                id="duracionPrestamo"
                                name="duracionPrestamo"
                                type="number"
                                fullWidth
                                value={duracionPrestamo}
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

export default EditarRolModal;
