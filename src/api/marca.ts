const API = 'https://proyecto-backend-sgbienestar.onrender.com/marca';

export const eliminar_marca = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });



const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/marca';

export const crearmarca = (rol) => {
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


export async function obtenermarca() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/marca'; // Reemplaza con la URL correcta

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de EPS');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error al obtener EPS: ${error.message}`);
    }
}



const API2 = 'https://proyecto-backend-sgbienestar.onrender.com/marca/update';

export const actualizarMarca = (id, nombre) => {
    const url = `${API2}/${id}`;

    return fetch(url, {
        method: 'PUT', // Puedes usar 'PATCH' si solo necesitas actualizar ciertos campos
        body: JSON.stringify(nombre),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar la marca');
            }
            return response.json();
        })
        .catch(error => {
            throw new Error(`Error al actualizar marca: ${error.message}`);
        });
};

