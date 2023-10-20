const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface Usuario {
    id: string;
}

export const eliminar_sancion = (id:Usuario) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
