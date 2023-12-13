const API = 'https://proyecto-backend-sgbienestar.onrender.com/estado-implemento';

export const eliminar_estadoImplemento = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const actualizarestadoImplemento= (estadoImpleme, estadoImplementoEditada) => {
    return fetch(`${API}/${estadoImpleme}`, {
        method: 'PUT', // Utiliza el método HTTP PUT para actualizar el rol
        body: JSON.stringify(estadoImplementoEditada),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el estado implemento : ${response.status}`);
            }
            return response.json();
        });
};




const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/estado-implemento';

export const crearestadoImplemento= (EstadoImplemento) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(EstadoImplemento),
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


export async function obtenerestadoImplemento() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/estado-implemento'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de estado implemento . Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de las estado implemento: ${error.message}, ${error.status}`);
    }

}
