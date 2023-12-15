import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cambiar } from '../../../api/Cambiar.ts';
import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
const Contrasena = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [activa, setActiva] = useState({
        correo: '',
        codigo: '',
        newPassword: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActiva({ ...activa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { correo, codigo, newPassword } = activa;
            const response = await Cambiar({ correo, codigo, newPassword });

            if (response.status === 201) {
                setActiva({
                    correo: '',
                    codigo: '',
                    newPassword: ''
                });
            } else {
                console.error('Error occurred');
            }
            if (response.statusCode === 202) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <center>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="correo">Ingresa tu correo institucional</InputLabel>
                            <OutlinedInput
                                id="correo"
                                type="email"
                                name="correo"
                                fullWidth
                                value={activa.correo}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="correo">Codigo que llego al correo</InputLabel>
                            <OutlinedInput
                                id="codigo"
                                type="string"
                                name="codigo"
                                fullWidth
                                value={activa.codigo}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="contrasena"
                                type={showPassword ? 'text' : 'password'}
                                value={activa.newPassword}
                                name="newPassword"        
                                onChange={handleChange}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Ingrese su contraseña"
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                Cambiar Contraseña
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </center>
        </form>
    );
};

export default Contrasena;
