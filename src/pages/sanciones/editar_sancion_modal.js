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
    TextareaAutosize,
} from '@mui/material';

const EditarSancionModal = ({ sancion, open, onClose, onGuardar }) => {
    const [dias, setDias] = useState(0);
    const [horas, setHoras] = useState(0);

    useEffect(() => {
        setHoras(dias * 24);
    }, [dias]);
    console.log(horas);

    const handleDiasChange = (e) => {
        setDias(e.target.value);
    };

    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        // Verifica si sancion no es null antes de asignar valores
        if (sancion) {
            setDescripcion(sancion.description || '');
        }
    }, [sancion]);

    const handleChange = (e) => {
        setDescripcion(e.target.value);
    };

    const handleGuardar = () => {
        // Lógica para guardar la sanción editada
        onGuardar(descripcion);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Sanción</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="Dias">Días</InputLabel>
                            <OutlinedInput
                                id="Dias"
                                type="number"
                                placeholder='Días a sancionar'
                                name="dias"
                                fullWidth
                                value={dias}
                                onChange={handleDiasChange}
                                required
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                            <TextareaAutosize
                                id="descripcion"
                                name="description"
                                minRows={4}
                                value={descripcion}
                                onChange={handleChange}
                                style={{ width: '100%' }}
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
