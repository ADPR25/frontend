import React, { useState, useEffect } from 'react';
import {
  Grid, Stack, DialogContent, Select, MenuItem, DialogActions, Dialog, DialogTitle, Button, InputLabel, OutlinedInput
} from '@mui/material';
import { marca, categoria, C_implemento } from '../../api/crear_implemento.ts';
import { estado_implemento } from '../../api/estado-implemento.ts';

const CrearImplementoModal = ({ open, onClose }) => {
  const [e_iData, sete_iData] = useState([]);
  const [marcaData, setMarcaData] = useState([]);
  const [categoriaData, setCategoriaData] = useState([]);

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
    categoria: [''],
    cantidad: 0,
    img: null,
    estado: [{
      estado: '',
      cantidad: 0,
      apto: true,
    }],
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

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'cantidad') {
      const numericValue = parseFloat(value);
      setFormData({ ...formData, [name]: isNaN(numericValue) ? '' : numericValue });
    } else if (name.startsWith('descripcion')) {
      const descripcionField = name.split('.')[1];
      setFormData({
        ...formData,
        descripcion: { ...formData.descripcion, [descripcionField]: value || 'N/A' },
      });
    } else if (name === 'estado') {
      setFormData({ ...formData, [name]: { estado: value || 'N/A' } });
    } else {
      setFormData({ ...formData, [name]: value || 'N/A' });
    }
  };
  ``
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(formData.cantidad)) {
      console.error('La cantidad no es un número válido.');
      return;
    }
    console.log('from data: ', formData)

    try {
      const result = await C_implemento(formData);

      console.log(result);

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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                fullWidth
                                style={{ width: '100%' }}
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
                value={formData.estado.estado}
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
