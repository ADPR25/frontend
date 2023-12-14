// CombinedRoutes.js

import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const Activation_acount = Loadable(lazy(() => import('pages/authentication/activation')));
const Rest_contrasena = Loadable(lazy(() => import('pages/authentication/Rest_pass')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Listar_sanciones = Loadable(lazy(() => import('pages/sanciones/listar_sanciones')));
const Crear_sanciones = Loadable(lazy(() => import('pages/sanciones/crear_sanciones')));
const Inventario = Loadable(lazy(() => import('pages/inplementos/listar')));
const Lista_prestamos = Loadable(lazy(() => import('pages/prestamo/listar')));
const Prestar = Loadable(lazy(() => import('pages/prestamo/prestar')));
const Informes = Loadable(lazy(() => import('pages/imformes/informe')));
const Informes2 = Loadable(lazy(() => import('pages/imformes/informe2')));
const Informes3 = Loadable(lazy(() => import('pages/imformes/informe3')));
const Informes4 = Loadable(lazy(() => import('pages/imformes/informe4')));
const EPS = Loadable(lazy(() => import('pages/eps/eps')));
const Jornada = Loadable(lazy(() => import('pages/jornada/jornada')));
const NivelFormacion = Loadable(lazy(() => import('pages/nivel_formacion/nivel_formacion')));
const EstadoImplemento = Loadable(lazy(() => import('pages/estado_implemento/estado_implemento')));
const MARCA = Loadable(lazy(() => import('pages/marca/Marca')));
const DOMINIO = Loadable(lazy(() => import('pages/dominio/Dominio')));
const Sancion = Loadable(lazy(() => import('pages/sanciones/sancion')));

const Imagenes = Loadable(lazy(() => import('pages/imagen/imagen')));
const Rol = Loadable(lazy(() => import('pages/roles/rol')));
const Prestar_admin = Loadable(lazy(() => import('pages/prestamo/admin_prestamo')));


const decodeToken = (token) => {
  try {
    const decoded = atob(token.split('.')[1]);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const obtenerRolDelToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken = decodeToken(token);
    return decodedToken?.rol || null;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const AuthRoutes = [
  {
    path: 'Rest_contrasena',
    element: <Rest_contrasena />,
  },
  {
    path: 'activation',
    element: <Activation_acount />,
  },
  {
    path: '/',
    element: <AuthLogin />,
  },
  {
    path: 'register',
    element: <AuthRegister />,
  },
];

const Routes = () => {
  const token = localStorage.getItem('token');
  const usuario = obtenerRolDelToken(token);

  const authRoutes = AuthRoutes.map((route) => ({
    ...route,
    element: token ? <Navigate to="/inicio" /> : route.element,
  }));

  let dashboardRoutes;

  if (usuario === 'Aprendiz' || usuario === 'Instructor') {
    dashboardRoutes = {
      path: '/',
      element: token ? <MainLayout /> : <Navigate to="/" />,
      children: [
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />,
            },
          ],
        },
        {
          path: 'Prestar',
          element: <Prestar />,
        },
        {
          path: 'Sancion',
          element: <Sancion />,
        }
      ],
    };
  } else if (usuario === 'Administrador') {
    dashboardRoutes = {
      path: '/',
      element: token ? <MainLayout /> : <Navigate to="/" />,
      children: [
        {
          path: '/inicio',
          element: <DashboardDefault />,
        },
        {
          path: '/Prestar_admin',
          element: <Prestar_admin />,
        },
        {
          path: 'rol',
          element: <Rol />,
        },
        {
          path: 'DOMINIO',
          element: <DOMINIO />,
        },
        {
          path: 'MARCA',
          element: <MARCA />,
        },
        {
          path: 'NivelFormacion',
          element: <NivelFormacion />,
        },
        {
          path: 'EstadoImplemento',
          element: <EstadoImplemento />,
        },
        {
          path: 'jornada',
          element: <Jornada />,
        },
        {
          path: 'Listar_sanciones',
          element: <Listar_sanciones />,
        },
        {
          path: 'EPS',
          element: <EPS />,
        },
        {
          path: 'Crear_sanciones',
          element: <Crear_sanciones />,
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />,
            },
          ],
        },
        {
          path: 'Inventario',
          element: <Inventario />,
        },
        {
          path: 'Informes',
          element: <Informes />,
        },
        {
          path: 'Informes2',
          element: <Informes2 />,
        },
        {
          path: 'Informes3',
          element: <Informes3 />,
        },
        {
          path: 'Informes4',
          element: <Informes4 />,
        },
        {
          path: 'Imagenes',
          element: <Imagenes />,
        },
        {
          path: 'Lista_prestamos',
          element: <Lista_prestamos />,
        },
        {
          path: 'Prestar',
          element: <Prestar />,
        },
      ],
    };
  }

  const combinedRoutes = {
    path: '/',
    children: [...authRoutes, dashboardRoutes].filter(Boolean),
  };

  return useRoutes([combinedRoutes]);
};

export default Routes;
