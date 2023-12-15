const API = 'https://proyecto-backend-sgbienestar.onrender.com/jornada';

export const eliminar_jornada = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });


    
export const actualizarjornada = async (jornadaId, { nombre }) => {
    try {
        const response = await fetch(`${API}/${jornadaId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre }),
        });

        if (!response.ok) {
            throw new Error(`Error updating jornada: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Updated jornada:', data);

        return data;
    } catch (error) {
        console.error('Error updating jornada:', error.message);
        throw error;
    }
};





const API3 = 'https://proyecto-backend-sgbienestar.onrender.com/jornada';

export const crearjornada = (jornada) => {
    return fetch(API3, {
        method: 'POST',
        body: JSON.stringify(jornada),
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


export async function obtenerjornada() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/jornada'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de jornada. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de las jornada: ${error.message}, ${error.status}`);
    }

}
