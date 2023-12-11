const API = 'https://proyecto-backend-sgbienestar.onrender.com/registro/usuario/findByMail/';

interface sancion {
    correo: string
}

export const buscar_sancionado = async (usuario: sancion) => {
    try {
        const encodedCorreo = encodeURIComponent(usuario.correo);
        const response = await fetch(`${API}${encodedCorreo}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        console.log('buscar_sancionado response:', response); // Add this line to log the response

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            console.error('Error al buscar el usuario:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud de búsqueda:', error);
        return null;
    }
};
