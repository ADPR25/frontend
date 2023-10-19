const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface sancion {
    usuario: string
    duracion: number
    description: string
    estado: boolean
}

export const Sancionar = (usuario: sancion) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });
