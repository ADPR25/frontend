// menuItems.js

import dashboard from './dashboard';
import Sanciones from './sanciones';
import Inplemento from './inplementos';
import informe from './informe';
import Imagen from './imagen';
import LPrestamo from './listar';
import LPrestamo2 from './prestamo';
import Roles from './rol';
import sancion_user from './sancion';
import user from './user';

const menuItems = (usuario) => {
  let items = [];

  if (usuario === 'Aprendiz' || usuario === 'Instructor') {
    items = [LPrestamo2, sancion_user, user];
  } else if (usuario === 'Administrador') {
    items = [dashboard,Roles, Imagen, informe ,LPrestamo, Sanciones, Inplemento, user];
  }

  return { items };
};

export default menuItems;
