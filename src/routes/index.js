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
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Listar_sanciones = Loadable(lazy(() => import('pages/sanciones/listar_sanciones')));
const Crear_sanciones = Loadable(lazy(() => import('pages/sanciones/crear_sanciones')));
const Inventario = Loadable(lazy(() => import('pages/inplementos/listar')));
const Lista_prestamos = Loadable(lazy(() => import('pages/prestamo/listar')));
const Prestar = Loadable(lazy(() => import('pages/prestamo/prestar')));
const Informes = Loadable(lazy(() => import('pages/imformes/informe')));
const Imagenes = Loadable(lazy(() => import('pages/inagen/imagen')));
const Rol = Loadable(lazy(() => import('pages/roles/rol')));
const Prestar_admin = Loadable(lazy(() => import('pages/prestamo/admin_prestamo')));

// Simula la decodificación del token (ajusta según tu implementación real)
const decodeToken = (token) => {
  try {
    // Decodificación básica del token (¡ajusta según tu necesidad!)
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
          path: 'color',
          element: <Color />,
        },
        {
          path: 'rol',
          element: <Rol />,
        },
        {
          path: 'Listar_sanciones',
          element: <Listar_sanciones />,
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
          path: 'Imagenes',
          element: <Imagenes />,
        },
        {
          path: 'shadow',
          element: <Shadow />,
        },
        {
          path: 'typography',
          element: <Typography />,
        },
        {
          path: 'icons/ant',
          element: <AntIcons />,
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
