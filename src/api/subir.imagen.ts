const API = 'https://proyecto-backend-sgbienestar.onrender.com/load-image/upload';

export const Imagenes = (imagen) => {
    return fetch(API, {
        method: 'POST',
        body: JSON.stringify(imagen),
        headers: {
            'Content-Type': 'application/json', // Cambiado 'content-type' a 'Content-Type'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir imagenes'); // Puedes personalizar el mensaje de error
            }
            return response.json();
        });
};
