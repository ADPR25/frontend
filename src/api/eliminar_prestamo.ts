const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';

interface Usuario {
    id: string;
}

export const eliminar_prestamo = (id: Usuario) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
