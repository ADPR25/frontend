const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';

export const crearPrestamo = (prestar) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(prestar),
        headers: {
            'content-type': 'application/json',
        },
    });
