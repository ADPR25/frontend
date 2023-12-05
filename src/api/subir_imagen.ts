const API = 'https://proyecto-backend-sgbienestar.onrender.com/load-image/upload';

export const subirImagen = (formData: FormData) => {
    const headers: HeadersInit = {
    };

    return fetch(API, {
        method: 'POST',
        body: formData,
        headers: headers,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir imágenes');
            }
            return response.json();
        });
};
