const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface Usuario {

}

export const buscarusuario = (usuario: Usuario) =>
    fetch(`${API}`, {
        method: 'UPDATE',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });
