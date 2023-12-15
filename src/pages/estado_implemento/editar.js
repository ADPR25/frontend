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
import { actualizarestadoImplemento } from '../../api/estadoImplemento.ts'; // Importa la función necesaria desde tu archivo de API

const EditarEstadoImplementoModal = ({ estadoImplemento, open, onClose, onEstadoImplementoActualizado }) => {
    const [estado, setEstado] = useState('');

    useEffect(() => {
        if (estadoImplemento) {
            setEstado(estadoImplemento.estado || '');
        }
    }, [estadoImplemento]);

    const handleChange = (e) => {
        const { value } = e.target;
        setEstado(value);
    };

    const handleGuardar = () => {
        if (estadoImplemento && estadoImplemento._id) {
            const estadoImplementoEditado = {
                estado,
            };
            actualizarestadoImplemento(estadoImplemento._id, estadoImplementoEditado)
                .then(() => {
                    console.log('Estado del implemento editado con éxito');
                    onEstadoImplementoActualizado();
                    onClose();
                })
                .catch((error) => console.error(error));
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Estado del Implemento</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <OutlinedInput
                                id="estado"
                                name="estado"
                                fullWidth
                                value={estado}
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

export default EditarEstadoImplementoModal;
