import React, { useState, useEffect } from 'react';
import {
    Grid,
    TextField,
    InputLabel,
    Stack,
    MenuItem,
    Button,
    Select,
} from '@mui/material';
import { obtener_inplemeto_id } from '../../api/inventario2.ts';
import { crearPrestamo } from '../../api/prestar.ts';
import { categoria } from '../../api/crear_implemento.ts';
import { buscar_prestamos_por_usuario } from '../../api/user_prestamo.ts';

const Prestar = () => {
    function obtenerFechaActual() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();
        const horas = '00';
        const minutos = '00';
        const segundos = '00';

        const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia} ${horas}:${minutos}:${segundos}`;

        return fechaFormateada;
    }

    const fechaActual = obtenerFechaActual();
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');
    let usuario = '';

    try {
        const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
        usuario = tokenData.id || '';
    } catch (error) {
        console.error('Error al parsear el token:', error);
    }

    const [formData, setFormData] = useState({
        usuario: usuario,
        implementos: [''],
        cantidad_implementos: [0],
        estado: '65372a7d48191d49b7466fda',
        fecha_inicio: fechaActual,
        fecha_fin: fechaActual,
    });

    const [implementoData, setImplementoData] = useState([]);
    const [categoriaData, setCategoriaData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const n_i = await obtener_inplemeto_id();
                setImplementoData(n_i);
            } catch (error) {
                console.error('Error al obtener los nombres de los implementos', error);
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

    const obtenerImplementosPorCategoria = async (categoriaId) => {
        try {
            const implementos = await obtener_inplemeto_id(categoriaId);
            setImplementoData(implementos);
        } catch (error) {
            console.error('Error al obtener los implementos por categoría', error);
        }
    };

    const [tienePrestamos, setTienePrestamos] = useState(false);
    const [ultimoPrestamo, setUltimoPrestamo] = useState(null);

    useEffect(() => {
        async function checkPrestamos() {
            try {
                const prestamos = await buscar_prestamos_por_usuario(usuario);
                setTienePrestamos(prestamos.length > 0);
                setUltimoPrestamo(prestamos.length > 0 ? prestamos[0] : null);
            } catch (error) {
                console.error('Error al buscar préstamos del usuario', error);
            }
        }

        checkPrestamos();
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'categoria') {
            obtenerImplementosPorCategoria(value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === 'implementos' || name === 'cantidad_implementos' ? [value] : value,
            }));
        }
    };

    const handleSubmit = async () => {
        if (tienePrestamos && ultimoPrestamo.estado.nombre === 'Completado') {
            try {
                await crearPrestamo(formData);
                setMensaje('Préstamo realizado correctamente.');
                location.reload();
            } catch (error) {
                console.error('Error creating loan:', error);
            }
        } else {
            setMensaje('El usuario ya tiene préstamos activos o el último préstamo no está completado. No se puede prestar más.');
        }
    };

    return (
        <>
            <form>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
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
                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor={`implemento-`}>Nombre del implemento</InputLabel>
                            <Select
                                id={`implemento`}
                                name={`implementos`}
                                fullWidth
                                value={formData.implementos}
                                onChange={(e) => handleChange(e)}
                            >
                                {implementoData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor={`cantidad-`}>Cantidad de implementos</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name={`cantidad_implementos`}
                                value={formData.cantidad_implementos}
                                onChange={(e) => handleChange(e)}
                            />
                        </Stack>
                    </Grid>
                </Grid>

                <br />
                {mensaje && (
                    <div style={{ textAlign: 'center', color: mensaje.includes('Error') ? 'red' : 'red' }}>
                        {mensaje}
                    </div>
                )}
                <br />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={1}></Grid>
                    <Grid item xs={12} md={10}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Prestar
                            </Button>
                        </center>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>
                </Grid>
            </form>
            <br />
            <br />
        </>
    );
};

export default Prestar;
