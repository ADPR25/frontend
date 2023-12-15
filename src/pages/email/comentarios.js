import React, { useEffect, useState } from 'react';
import { 
    Box,
    Typography,
    List,
    ListItem,
    Avatar,
} from '@mui/material';
import {comentarios } from '../../api/correo.ts';

const Comentarios = () => {
    const [comentariosList, setComentariosList] = useState([]);
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

    
    return (
        <div>
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

export default Comentarios;
