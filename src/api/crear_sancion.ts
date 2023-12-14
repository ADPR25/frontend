const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface Sancion {
    usuario: string;
    description: string;
    estado: boolean;
    duracion: number;
}

export const Sancionar = (sancion: Sancion) =>
    fetch(API, {
        method: 'POST',
        body: JSON.stringify(sancion),
        headers: {
            'Content-Type': 'application/json',
        },
    });
