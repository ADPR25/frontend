const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos/aprobar';


export const aprobar_prestamo = (id) =>
    fetch(`${API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
