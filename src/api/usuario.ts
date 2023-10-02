const API = 'http://localhost:4000/usuario';

interface usuario {
    nombre: string,
    apellido: string,
    eps: string,
    genero: string,
    tipoDocumento: string,
    numero_documento: string,
    correo_sena: string,
    fecha_nacimiento: string,
    correo_personal: string,
    rol: string,
    telefono: string,
    numero_ficha: string,
    tipo_sangre: string,
    password: string
    direccion: string,
}

export const createusuariorequest = (usuario: usuario) =>
    fetch(`${API}/crear`, { // Usa la ruta correcta para la creación de usuarios
        method: 'Post',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json'
        }
    })
