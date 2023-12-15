const API = 'https://proyecto-backend-sgbienestar.onrender.com/mail';

export const eliminarCorreo = (id: string) => {
    return fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar el correo: ${response.status}`);
            }
            return response.json();
        });
};

export const actualizarCorreo = (correoId: string, nuevoCorreo: any) => {
    const apiEndpoint = `${API}/actualizar`;
    return fetch(`${apiEndpoint}/${correoId}`, {
        method: 'PUT',
        body: JSON.stringify(nuevoCorreo),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el correo: ${response.status}`);
            }
            return response.json();
        });
};


const url = 'https://proyecto-backend-sgbienestar.onrender.com/mail/usuario/notificacion'
export const crearCorreo = (correo: any) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(correo),
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

export async function comentarios() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/mail/comentario'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de implemento. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de los implemento: ${error.message}, ${error.status}`);
    }

}
