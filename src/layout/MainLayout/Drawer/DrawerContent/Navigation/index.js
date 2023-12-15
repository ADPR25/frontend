import menuItems from '../../../../../menu-items/index';
import NavGroup from './NavGroup';
import { Typography, Box } from '@mui/material';

// Define la función obtenerRolDelToken
const obtenerRolDelToken = () => {
  const token = localStorage.getItem('token');


  let usuario = '';

  try {
    const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
    usuario = tokenData.rol || ''; // Aquí cambia de tokenData.rol?.nombre a tokenData.rol
  } catch (error) {
    console.error('Error al parsear el token:', error);
  }

  return usuario;
};

const Navigation = () => {
  const role = obtenerRolDelToken();

  const { items } = menuItems(role);

  const navGroups = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
