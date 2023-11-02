const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';

export const actualizarPrestamo = (prestamoId, pretamoEditada) => {
    return fetch(`${API}/${prestamoId}`, {
        method: 'PATCH', // Utiliza el método HTTP PUT para actualizar la sanción
        body: JSON.stringify(pretamoEditada),
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
