// registro.js
interface Register {
    nombres: string;
    apellidos: string;
    eps: string;
    genero: string;
    tipo_doc: string;
    n_doc: string;
    correo_inst: string;
    fecha_nacimiento: string;
    correo_pers?: string;
    rol: string;
    telefono: string;
    ficha?: string;
    rh?: string;
    direccion: string;
    pps: boolean;
    token?: string;
    activacion: boolean;
}

// Función para hacer la solicitud POST
export const createUsuarioRequest = async (usuario: Register) => {
    try {
        const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
