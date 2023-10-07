const API = 'https://proyecto-backend-sgbienestar.onrender.com/registro/login';

interface Usuario {
    correo_inst: string;
    contrasena: string;
}

export const buscarusuario = (usuario: Usuario) =>
    fetch(`${API}/login`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });
    