import React, { useState, useEffect } from 'react';
import {
    Grid, Stack, Typography, IconButton, DialogContent, Select, MenuItem, DialogActions, Dialog, DialogTitle, Button, InputLabel, OutlinedInput
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { marca, categoria } from '../../api/crear_implemento.ts';
import { estado_implemento } from '../../api/estado-implemento.ts';
// import { actualizarImplemento } from '../../api/actualizar_implemento.ts';

const EditarImplementoModal = ({ implemento, open, onClose }) => {
    const [marcaData, setMarcaData] = useState([]);
    const [categoriaData, setCategoriaData] = useState([]);
    const [e_iData, sete_iData] = useState([]);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        marca: '',
        descripcion: {
            peso: '',
            color: '',
            material: '',
            detalle: '',
            tamano: '',
        },
        categoria: '',
        cantidad: 0,
        img: null,
        estado: [
            { estado: '', cantidad: 0, apto: true },
        ],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await estado_implemento();
                sete_iData(e_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }

        fetchData();
    }, []);

    const [cantidadSets, setCantidadSets] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const marcas = await marca();
                setMarcaData(marcas);
            } catch (error) {
                console.error('Error al obtener las marcas', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const categorias = await categoria();
                setCategoriaData(categorias);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (implemento) {
            setFormData({
                codigo: implemento.codigo || '',
                nombre: implemento.nombre || '',
                marca: implemento.marca || '',
                descripcion: {
                    peso: implemento.descripcion?.peso || '',
                    color: implemento.descripcion?.color || '',
                    material: implemento.descripcion?.material || '',
                    detalle: implemento.descripcion?.detalle || '',
                    tamano: implemento.descripcion?.tamano || '',
                },
                categoria: implemento.categoria || '',
                cantidad: implemento.cantidad || 0,
                img: implemento.img || null,
                estado: implemento.estado || [
                    { estado: '', cantidad: 0, apto: true },
                ],
            });
        }
    }, [implemento]);

    const handleChange = (event, index) => {
        // Rest of your handleChange function...
        if (name === 'cantidad') {
            const valorNumerico = parseFloat(value);
            setFormData((prevData) => ({
                ...prevData,
                cantidad: isNaN(valorNumerico) ? 0 : valorNumerico,
            }));
        } else if (name.startsWith('descripcion')) {
            const campoDescripcion = name.split('.')[1];
            setFormData({
                ...formData,
                descripcion: { ...formData.descripcion, [campoDescripcion]: value || 'N/A' },
            });
        } else if (name.startsWith('estado')) {
            setFormData((prevData) => {
                const newEstado = prevData.estado || [];
                const newCantidad = newEstado.reduce((total, e) => total + (parseInt(e.cantidad, 10) || 0), 0);
                return {
                    ...prevData,
                    cantidad: newCantidad,
                    estado: newEstado.map((e, i) =>
                        i === index ? { ...e, estado: value || 'N/A' } : e
                    ),
                };
            });
        } else if (name.startsWith('cantidad')) {
            setFormData((prevData) => {
                const newEstado = [...(prevData.estado || [])];
                const updatedEstado = newEstado.map((e, i) =>
                    i === index ? { ...e, cantidad: parseInt(value, 10) || 0 } : e
                );

                return {
                    ...prevData,
                    cantidad: updatedEstado.reduce((total, e) => total + (e.cantidad || 0), 0),
                    estado: updatedEstado,
                };
            });
        } else if (name.startsWith('apto')) {
            setFormData((prevData) => {
                const newEstado = prevData.estado || [];
                return {
                    ...prevData,
                    estado: newEstado.map((e, i) =>
                        i === index ? { ...e, apto: !e.apto } : e
                    ),
                };
            });
        } else {
            setFormData({ ...formData, [name]: value || 'N/A' });
        }
    };

    const handleAddSet = () => {
        setCantidadSets(cantidadSets + 1);
        setFormData((prevData) => ({
            ...prevData,
            estado: [
                ...prevData.estado,
                {
                    estado: '',
                    cantidad: 0,
                    apto: true,
                },
            ],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isNaN(formData.cantidad)) {
            console.error('La cantidad no es un número válido.');
            return;
        }

        try {
            // const result = await actualizarImplemento(formData);
            console.log(formData);

            if (result) {
                window.location.reload();
            } else {
                console.error('Error al crear el implemento:', result);
            }
        } catch (error) {
            console.error('Error al crear el implemento:', error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Crear Implemento</DialogTitle>
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
                                onChange={(e) => handleChange(e)}
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
                                onChange={(e) => handleChange(e)}
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
                                onChange={(e) => handleChange(e)}
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
                                value={formData.categoria}
                                onChange={(e) => handleChange(e)}
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
                            <InputLabel htmlFor="descripcion">DESCRIPCION</InputLabel>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="peso">Peso</InputLabel>
                            <OutlinedInput
                                id="peso"
                                name="descripcion.peso"
                                value={formData.descripcion.peso}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="color">Color</InputLabel>
                            <OutlinedInput
                                id="color"
                                name="descripcion.color"
                                value={formData.descripcion.color}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="material">Material</InputLabel>
                            <OutlinedInput
                                id="material"
                                name="descripcion.material"
                                value={formData.descripcion.material}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="detalle">Detalle</InputLabel>
                            <OutlinedInput
                                id="detalle"
                                name="descripcion.detalle"
                                value={formData.descripcion.detalle}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="tamaño">Tamaño</InputLabel>
                            <OutlinedInput
                                id="tamano"
                                name="descripcion.tamano"
                                value={formData.descripcion.tamano}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                style={{ width: '100%' }}
                            />
                        </Stack>
                    </Grid>

                    {[...Array(cantidadSets)].map((_, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={0}>
                                    <InputLabel htmlFor={`estado-${index}`}>Estado</InputLabel>
                                    <Select
                                        id={`estado-${index}`}
                                        name={`estado-${index}`}
                                        value={formData.estado[index]?.estado || ''}
                                        onChange={(e) => handleChange(e, index)}
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

                            <Grid item xs={12} md={6}>
                                <Stack spacing={0}>
                                    <InputLabel htmlFor={`cantidad-${index}`}>Cantidad</InputLabel>
                                    <OutlinedInput
                                        id={`cantidad-${index}`}
                                        type="number"
                                        name={`cantidad-${index}`}
                                        value={formData.estado[index]?.cantidad || 0}
                                        onChange={(e) => handleChange(e, index)}
                                        fullWidth
                                        style={{ width: '100%' }}
                                    />
                                </Stack>
                            </Grid>
                        </React.Fragment>
                    ))}

                    <Grid item xs={6} md={6}>
                        <Typography variant="h5">
                            Cantidad:
                            <IconButton color="primary" aria-label="Añadir" onClick={handleAddSet}>
                                <AddIcon />
                            </IconButton>
                        </Typography>
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

export default EditarImplementoModal;
