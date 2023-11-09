export async function estado_prestamo() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/estado-prestamo'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de prestamo. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de los prestamo: ${error.message}, ${error.status}`);
    }

}