import React, { useState, useEffect } from 'react';
import {
    Grid,
    Stack,
    InputLabel,
    TextField,
    Button,
    MenuItem,
    Select,
    TextareaAutosize,
    OutlinedInput
} from '@mui/material';
import { informes } from '../../api/informe.ts';
import { estado_implemento } from '../../api/estado-implemento.ts';
import { buscar_sancionado } from '../../api/buscar.ts' 


const Informes2 = () => {
    const [formData, setFormData] = useState({
        tipo_informe: '65374bb14d00eddbedad4102',
        usuario: '',
        dependencia: '',
        estado: '',
        usuario2:[],
        observaciones: ''
    });

    const [ setEstadoData] = useState([]); // Define estadoData state

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
                const userId = tokenData.id || '';
                setFormData({
                    ...formData,
                    usuario: userId,
                });
            } catch (error) {
                console.error('Error al cargar el ID del usuario:', error);
            }
        };

        loadUserId();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        if (name === 'correo') {
            setFormData({
                ...formData,
                [name]: value,
            }) 
        } else if (name === 'estado_implemento') {
            const selectedValues = Array.isArray(value) ? value : [value];
            setFormData({
                ...formData,
                [name]: selectedValues,  // No need to map to _id, just use selectedValues directly
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const n_i = await estado_implemento();
                setEstadoData(n_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }
        fetchData();
    }, []);
    const estado = [
        { value: 'Seleccione', label: 'Seleccione' },
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' },
        { value: 'Activo/Inactivo', label: 'Activo/Inactivo' },
      ];
      const handleGuardarInforme = async () => {
        try {
            const userData = await buscar_sancionado({
                correo: formData.correo,
            });
    
            // Check if userData has the required _id property
            if (userData && userData._id) {
                const userId = userData._id;
    
                console.log(formData);
                const response = await informes({
                    ...formData,
                    usuario2: [userId], // Use an array to match the structure of usuario2
                });
    
                console.log('Informe guardado con éxito:', response);
    
                setFormData({
                    tipo_informe: '65374bb14d00eddbedad4102',
                    usuario: formData.usuario,
                    estado: '',
                    usuario2: [], // Clear the user ID if needed
                    dependencia: '',
                    observaciones: '',
                });
            } else {
                console.error('Error al obtener el ID del usuario. userData:', userData);
            }
        } catch (error) {
            // ...
        }
    };
    
    

    return (
        <>
            <form>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>

                <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="correo_inst">Correo de la persona a sancionar</InputLabel>
                        <OutlinedInput
                            id="correo_inst"
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleFormChange}
                            placeholder='Correo de la persona a sancionar'
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>


                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="dependencia">Dependencia</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                 <Stack>
                  <InputLabel htmlFor="estado">Estado</InputLabel>
                   <Select
                   id="estado"
                   name="estado"
                  fullWidth
                  value={formData.estado}
                  onChange={handleFormChange}
                  >
                 {estado.map((option) => (
                  <MenuItem key={`estado-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                   ))}
                   </Select>
                  </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="observaciones">Observaciones</InputLabel>
                            <TextareaAutosize
                                id="observaciones"
                                name="observaciones"
                                minRows={4}
                                value={formData.observaciones}
                                onChange={handleFormChange}
                                placeholder="Descripción de la observacion"
                                style={{ width: '100%', height: '250px' }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleGuardarInforme}>
                                Guardar informe
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Informes2;
