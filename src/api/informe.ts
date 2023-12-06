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
            // Si la respuesta no es exitosa, arrojamos un error
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }

        const data = await response.json();

        // Aquí puedes realizar más validaciones específicas de tu aplicación

        return data;
    } catch (error) {
        console.error('Error en la función informes:', error);

        // Devolvemos un objeto de error con un mensaje específico
        return { error: 'Error al actualizar el archivo XLSX', details: error.message };
    }
};
