import React, { useState, useEffect } from 'react';
import {
    Grid, Stack, DialogContent, Select, TextareaAutosize, MenuItem, DialogActions, Dialog, DialogTitle, Button, InputLabel, OutlinedInput
} from '@mui/material';
import { marca, categoria, C_implemento } from '../../api/crear_implemento.ts';
import { estado_implemento } from '../../api/estado-implemento.ts';

const CrearImplementoModal = ({ open, onClose }) => {
    const [e_iData, sete_iDate] = useState([]);
    const [marcaData, setmarcaData] = useState([]);
    const [categoriaData, setcategoriaData] = useState([]);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        marca: '',
        categoria: [''],
        descripcion: '', 
        cantidad: 0,
        estado: [],
    });


    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await estado_implemento();
                sete_iDate(e_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await marca();
                setmarcaData(e_i);
            } catch (error) {
                console.error('Error al obtener las marcas', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await categoria();
                setcategoriaData(e_i);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        }

        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(`Value for ${name}: ${value}`);

        if (name === 'cantidad') {
            const numericValue = parseFloat(value);
            setFormData({ ...formData, [name]: isNaN(numericValue) ? '' : numericValue });
        } else if (name === 'descripcion') {
            setFormData({ ...formData, [name]: value.toString() });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if formData.cantidad is a valid number
    if (isNaN(formData.cantidad)) {
        console.error('La cantidad no es un número válido.');
        return;
    }

    try {
        const result = await C_implemento({
            codigo: formData.codigo,
            nombre: formData.nombre,
            marca: formData.marca,
            descripcion: formData.descripcion,
            categoria: formData.categoria,
            cantidad: formData.cantidad,
            img: 'nn',
            estado: [{
                estado: [{
                    estado: formData.estado
                }],
                cantidad: formData.cantidad,
                apto: true,
            }],
        });

        console.log(result);

        if (result) {
            // Reload the page after a successful submission
            window.location.reload();
        } else {
            console.error('Error al crear el implemento:', result);
        }
    } catch (error) {
        console.error('Error al crear el implemento:', error);
    }
}




    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Sanción</DialogTitle>
            <DialogContent>
                <Grid container spacing={5} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="codigo">Codigo</InputLabel>
                            <OutlinedInput
                                id="codigo"
                                type="text"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="marca">Marca</InputLabel>
                            <Select
                                id="marca"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            >
                                {marcaData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="categoria">Categoría</InputLabel>
                            <Select
                                id="categoria"
                                name="categoria"
                                value={[formData.categoria]}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            >
                                {categoriaData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                            <TextareaAutosize
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                minRows={4}
                                style={{ width: '100%', height: '100px' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
                            <OutlinedInput
                                id="cantidad"
                                type="number" // Asegura que el tipo sea numérico
                                name="cantidad"
                                value={formData.cantidad}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <Select
                                id="estado"
                                name="estado"
                                value={[formData.estado]}
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
                            >
                                {e_iData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.estado}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSubmit} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CrearImplementoModal;
