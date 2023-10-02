const API = 'http://localhost:4000/usuario';

interface Usuario {
    correo_sena: string;
    password: string;
}

export const buscarusuario = (usuario: Usuario) =>
    fetch(`${API}/login`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });
    