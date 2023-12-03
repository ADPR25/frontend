const API = 'https://proyecto-backend-sgbienestar.onrender.com/rol';

export const eliminar_Rol = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const actualizarRol = (rolId, rolEditada) => {
    return fetch(`${API}/${rolId}`, {
        method: 'PUT', // Utiliza el método HTTP PUT para actualizar el rol
        body: JSON.stringify(rolEditada),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el rol: ${response.status}`);
            }
            return response.json();
        });
};




const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/rol';

export const CrearRol = (rol) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(rol),
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
