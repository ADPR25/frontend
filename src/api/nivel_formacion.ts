const API = 'https://proyecto-backend-sgbienestar.onrender.com/nivel-formacion/nivel';

export const eliminar_nivelFormacion = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const actualizarnivelFormacion = (nivelFormacionId, nivelFormacionEditada) => {
    return fetch(`${API}/${nivelFormacionId}`, {
        method: 'PUT', // Utiliza el método HTTP PUT para actualizar el rol
        body: JSON.stringify(nivelFormacionEditada),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el nivel formacion : ${response.status}`);
            }
            return response.json();
        });
};




const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/nivel-formacion';

export const crearnivelFormacion = (NivelFormacion) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(NivelFormacion),
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


export async function obtenernivelFormacion() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/nivel-formacion/nivel'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de nivel formacion. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de las nivel formacion: ${error.message}, ${error.status}`);
    }

}
