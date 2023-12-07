const API = 'https://proyecto-backend-sgbienestar.onrender.com/informe';

export const informes = async (informe) => {
    try {
        const response = await fetch(API, {
            method: 'POST',
            body: JSON.stringify(informe),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa, arrojamos un error con detalles del servidor
            const errorDetails = await response.json();
            throw new Error('Error en la solicitud. Detalles: ' + JSON.stringify(errorDetails));
        }

        const data = await response.json();

        // Aquí puedes realizar más validaciones específicas de tu aplicación

        return data;
    } catch (error) {
        console.error('Error en la función informes:', error);

        // Devolvemos un objeto de error con el mensaje de la excepción
        return { error: 'Error al actualizar el informe', details: error.message };
    }
};
