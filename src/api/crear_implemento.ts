const API = 'https://proyecto-backend-sgbienestar.onrender.com/implementos';

interface sancion {
    codigo: string,
    nombre: string,
    marca: string,
    descripcion: string,
    categoria: string,
    cantidad: number,
    img: string,
    estado: string
}

export const C_implemento = (usuario: sancion) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });





export async function marca() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/marca'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar: ${error.message}, ${error.status}`);
    }

}



export async function categoria() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/categoria'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden: ${error.message}, ${error.status}`);
    }

}