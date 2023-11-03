const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';
export const actualizarPrestamo = (Id, prestamoEditada) => {
    return fetch(`${API}/${Id}`, {
        method: 'PATCH', // Utiliza el método HTTP PATCH para actualizar el préstamo
        body: JSON.stringify(prestamoEditada),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al actualizar el préstamo: ${response.status}`);
            }
            return response.json();
        });
};
