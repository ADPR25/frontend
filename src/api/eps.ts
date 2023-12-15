const API = 'https://proyecto-backend-sgbienestar.onrender.com/eps';

export const eliminar_eps = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const api2 ='https://proyecto-backend-sgbienestar.onrender.com/eps/eps'
    export const actualizareps = (epsId, epsEditada) => {
        return fetch(`${api2}/${epsId}`, {
            method: 'PUT',
            body: JSON.stringify(epsEditada),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al actualizar el rol: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error updating EPS:', error);
                throw error;
            });
    };




const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/eps';

export const creareps = (eps) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(eps),
        headers: {
            'Content-Type': 'application/json', // Cambiado 'content-type' a 'Content-Type'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud'); // Puedes personalizar el mensaje de error
            }
            return response.json();
        });
};
