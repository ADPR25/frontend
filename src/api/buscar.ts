const API = 'https://proyecto-backend-sgbienestar.onrender.com/registro/usuario/findByMail/';

interface sancion {
    correo: string
}
export const buscar_sancionado = async (usuario: sancion) => {
    try {
        const encodedCorreo = encodeURIComponent(usuario.correo); // Codificar el correo
        const response = await fetch(`${API}${encodedCorreo}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData._id;
        } else {
            console.error('Error al buscar el usuario:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud de búsqueda:', error);
        return null;
    }
};
