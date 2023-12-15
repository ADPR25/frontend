const API = 'https://proyecto-backend-sgbienestar.onrender.com/dominio-sena';

export const eliminar_dominio = (id) => {
    return fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar el dominio: ${response.status}`);
            }
            return response.json();
        });
};

const api0 = 'https://proyecto-backend-sgbienestar.onrender.com/dominio-sena/actualizar'
export const actualizardominio = (dominioId, nuevoDominio) => {
    return fetch(`${api0}/${dominioId}`, {
        method: 'PUT',
        body: JSON.stringify(nuevoDominio),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el dominio: ${response.status}`);
            }
            return response.json();
        });
};

const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/dominio-sena';

export const creardominio = (dominio) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(dominio),
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

export async function obtenerdominio() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/dominio-sena';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de dominio. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`No se pueden cargar los datos de las dominio: ${error.message}, ${error.status}`);
    }
}
