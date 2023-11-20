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
const CrearInplementos = Loadable(lazy(() => import('pages/inplementos/crear')));
const Inventario = Loadable(lazy(() => import('pages/inplementos/listar')));
const Lista_prestamos = Loadable(lazy(() => import('pages/prestamo/listar')));
const Prestar = Loadable(lazy(() => import('pages/prestamo/prestar')));

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

  const authRoutes = AuthRoutes.map((route) => ({
    ...route,
    element: token ? <Navigate to="/inicio" /> : route.element,
  }));

  const dashboardRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/inicio',
        element: <DashboardDefault />,
      },
      {
        path: 'color',
        element: <Color />,
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
        path: 'CrearInplementos',
        element: <CrearInplementos />,
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

  const combinedRoutes = {
    path: '/',
    children: [...authRoutes, dashboardRoutes],
  };

  return useRoutes([combinedRoutes]);
};

export default Routes;
