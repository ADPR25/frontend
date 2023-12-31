const API = 'https://proyecto-backend-sgbienestar.onrender.com/implementos';

interface Descripcion {
    peso: string;
    color: string;
    material: string;
    detalle: string;
    tamano: string;
}

interface Estado {
    estado: string;
    cantidad: number;
    apto: boolean;
}

interface ActualizarImplemento {
    codigo: string;
    nombre: string;
    marca: string;
    descripcion: Descripcion;
    categoria: string[];
    cantidad: number;
    img: string | null;
    estado: Estado[];
}

export const actualizarImplemento = (usuario: ActualizarImplemento) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });

