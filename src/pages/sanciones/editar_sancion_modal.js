// editar_sancion_modal.js

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
    TextareaAutosize,
} from '@mui/material';
import { actualizarSancion } from '../../api/actualizar_sancion.ts'

const EditarSancionModal = ({ sancion, open, onClose }) => {
    const [descripcion, setDescripcion] = useState('');
    const [sancionId, setSancionId] = useState(null);

    useEffect(() => {
        if (sancion) {
            setSancionId(sancion._id);
            setDescripcion(sancion.description || '');
        }
    }, [sancion]);

    const handleChange = (e) => {
        setDescripcion(e.target.value);
    };

    // En el componente EditarSancionModal
    const handleGuardar = () => {
        if (sancionId) {
            const sancionEditada = {
                description: descripcion,
                // Otras propiedades de la sanción que desees actualizar
            };
            actualizarSancion(sancionId, sancionEditada)
                .then((data) => {
                    console.log('Sanción editada:', data);
                    onClose();
                })
                .catch((error) => console.error(error));
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Sanción</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                            <TextareaAutosize
                                id="descripcion"
                                name="description"
                                minRows={4}
                                value={descripcion}
                                onChange={handleChange}
                                style={{ width: '600px' }}
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

export default EditarSancionModal;
