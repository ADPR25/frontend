const ficha_API = 'http://localhost:4000/fichas/obten';

export const obtenerFichas = async () => {
    try {
        
        const response = await fetch(`${ficha_API}`, {
            method: 'GET', // Cambiado a 'GET' en lugar de 'Get'
            headers: {
                
                'Content-Type': 'application/json',
            },
           
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ficha data: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const ficha = await response.json();
        return ficha;
    } catch (error) {
        console.error('Error al obtener la información de las fichas:', error);
        throw error;
    }
};
