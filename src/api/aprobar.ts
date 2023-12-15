const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos/aprobar';


export const aprobar_prestamo = (id) =>
    fetch(`${API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const API2 = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos/finalizar';

export const completar_prestamos = (id) => {
    const estadoFijo = '65372ab248191d49b7466fe0';

    const data = {
        id: id,
        estado: estadoFijo,
    };

    return fetch(`${API2}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
