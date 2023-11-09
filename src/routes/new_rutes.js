import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
//sanciones

const Listar_sanciones = Loadable(lazy(() => import('pages/sanciones/listar_sanciones')));
const Crear_sanciones = Loadable(lazy(() => import('pages/sanciones/crear_sanciones')));


//inplementos

const CrearInplementos = Loadable(lazy(() => import('pages/inplementos/crear')));
const Inventario = Loadable(lazy(() => import('pages/inplementos/listar')));

//prestamos

const Lista_prestamos = Loadable(lazy(() => import('pages/prestamo/listar')));
const Prestar = Loadable(lazy(() => import('pages/prestamo/prestar')));

//recuperacion
// ==============================|| MAIN ROUTING ||============================== //

const newRutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'Listar_sanciones',
            element: <Listar_sanciones />
        },
        {
            path: 'Crear_sanciones',
            element: <Crear_sanciones />
        },
        {
            path: 'Inventario',
            element: <Inventario />
        },
        {
            path: 'CrearInplementos',
            element: <CrearInplementos />
        },
        
        {
            path: 'Lista_prestamos',
            element: <Lista_prestamos />
        },
        {
            path: 'Prestar',
            element: <Prestar />
        }
        
    ]
};

export default newRutes;
