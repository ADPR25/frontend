export async function Estado_I() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/estado-implemento'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de Estado_I. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de Estado_I: ${error.message}, ${error.status}`);
    }
}
