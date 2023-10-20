const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

export const actualizarSancion = (sancionId, sancionEditada) => {
    return fetch(`${API}/${sancionId}`, {
        method: 'PATCH', // Utiliza el método HTTP PUT para actualizar la sanción
        body: JSON.stringify(sancionEditada),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar la sanción: ${response.status}`);
            }
            return response.json();
        });
};
