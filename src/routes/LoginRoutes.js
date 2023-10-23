import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const Activation_acount = Loadable(lazy(() => import('pages/authentication/activation')));

// recuperar contraseña

const Rest_contrasena = Loadable(lazy(() => import('pages/authentication/Rest_pass')));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'Rest_contrasena',
      element: <Rest_contrasena />
    },
    {
      path: 'activation',
      element: <Activation_acount />
    },
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    
  ]
};

export default LoginRoutes;
