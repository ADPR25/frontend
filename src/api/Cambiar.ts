export const Cambiar = (data) => {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/registro/rest/password';

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        });
};
