const API = 'https://proyecto-backend-sgbienestar.onrender.com/implementos';

interface crear {
    codigo: string,
    nombre: string,
    marca: string,
    descripcion: {},
    categoria: [string],
    cantidad: number,
    img: string,
    estado: [{
        estado: [{
            estado:string
        }]
        cantidad: number
        apto: boolean
    }
    ]
}

export const C_implemento = (usuario: crear) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });


// export async function C_implemento(data) {
//     const url = 'https://proyecto-backend-sgbienestar.onrender.com/implementos';

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error(`No se pudo: ${response.status}`);
//         }

//         const responseData = await response.json();
//         return responseData;
//     } catch (error) {
//         throw new Error(`No se pueden cargar: ${error.message}`);
//     }
// }



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