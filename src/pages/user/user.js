import React from 'react';
import { Paper, Typography, Divider, Grid } from '@mui/material';

const Profile = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <p>No estás autenticado</p>;
    }
    const user = JSON.parse(atob(token.split('.')[1]));
    return (
        <Grid container justifyContent="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Perfil del Usuario
                    </Typography>
                    <Divider />
                    <Typography variant="body1" paragraph>
                        <strong>Nombre completo:</strong> {user.nombre} {user.apellidos}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Número de Documento:</strong> {user.n_doc}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Correo Institucional:</strong> {user.correo_inst}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Rol:</strong> {user.rol}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Profile;
