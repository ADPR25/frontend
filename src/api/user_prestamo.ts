const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos/usuario';

export const buscar_prestamos_por_usuario = (usuario) => {
    const apiUrl = `${API}/${usuario}`; 

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de servidor: ${response.status}`);
            }
            return response.json();
        });
};
