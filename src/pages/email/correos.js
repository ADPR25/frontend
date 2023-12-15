import React, { useState, useEffect } from 'react';
import {
    TextareaAutosize,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    Avatar,
} from '@mui/material';
import { crearCorreo, comentarios } from '../../api/correo.ts';

const Correo = () => {
    const [mensaje, setMensaje] = useState('');
    const [asunto, setAsunto] = useState('');
    const [comentariosList, setComentariosList] = useState([]);
    const [setDecodedToken] = useState(null);

    useEffect(() => {
        loadComentarios();
        decodeAndPrintToken();
    }, []);

    const loadComentarios = async () => {
        try {
            const comentariosData = await comentarios();
            setComentariosList(comentariosData);
        } catch (error) {
            console.error('Error al cargar los comentarios:', error.message);
        }
    };

    const decodeAndPrintToken = () => {
        const token = localStorage.getItem('token');
        try {
            const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
            console.log('Decoded Token:', tokenData);
            setDecodedToken(tokenData._correo_inst);
        } catch (error) {
            console.error('Error al parsear el token:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        let usuario = '';

        try {
            const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
            usuario = tokenData.correo_inst || '';
        } catch (error) {
            console.error('Error al parsear el token:', error);
        }

        try {
            const response = await crearCorreo({
                correo: usuario,
                mensaje: mensaje,
                asunto: asunto,
            });
            console.log('Respuesta del servidor:', response);
            loadComentarios();
            setAsunto('');
            setMensaje('');
        } catch (error) {
            console.error('Error al crear el correo:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                <TextareaAutosize
                    label="Asunto"
                    variant="outlined"
                    fullWidth
                    value={asunto}
                    placeholder='Escribe el asunto'
                    onChange={(e) => setAsunto(e.target.value)}
                    style={{ width: '100%', height: '50px' }}
                />

                <TextareaAutosize
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    value={mensaje}
                    placeholder='Escribe tu mensaje'
                    onChange={(e) => setMensaje(e.target.value)}
                    style={{ width: '100%', height: '250px' }}
                />

                <center>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Enviar comentario
                    </Button>
                </center>
            </form>

            <Box mt={4}>
                <Typography variant="h5">Comentarios de usuarios:</Typography>
                <List>
                    {comentariosList.map((comentario, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <Avatar>{comentario.correo ? comentario.correo[0].toUpperCase() : ''}</Avatar>
                            <Box ml={2}>
                                <Typography variant="subtitle1">{comentario.asunto || 'No Asunto'}</Typography>
                                <Typography variant="body2">{comentario.mensaje || 'No Mensaje'}</Typography>
                                <Typography variant="caption">{comentario.createdAt ? new Date(comentario.createdAt).toLocaleString() : 'No Date'}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default Correo;
