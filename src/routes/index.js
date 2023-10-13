import { useRoutes } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import newRutes from './new_rutes';

export default function ThemeRoutes() {
  return useRoutes([
    LoginRoutes,
    MainRoutes,
    newRutes,
  ]);
}
