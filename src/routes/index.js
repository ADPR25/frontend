// ARCHIVO ThemeRoutes.js
import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import newRutes from './new_rutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, newRutes, MainRoutes ]); // Cambia el orden de LoginRoutes y MainRoutes
}
