const EPS_API = 'http://localhost:4000/eps';

export const buscarEps = async () => {
    try {
        const response = await fetch(`${EPS_API}/obten`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch EPS data: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const eps = await response.json();
        return eps;
    } catch (error) {
        console.error('Error al obtener la información de las EPS:', error);
        throw error;
    }
};
