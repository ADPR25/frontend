interface activacion {
    codigo: string
}

export const activacion = async (usuario: activacion) => {
    try {
        const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/registro/auth', {
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
