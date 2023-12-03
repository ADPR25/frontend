// menuItems.js

import dashboard from './dashboard';
import Sanciones from './sanciones';
import utilities from './utilities';
import Inplemento from './inplementos';
import Prestamo from './prestamo';
import informe from './informe';
import Imagen from './imagen';
import LPrestamo from './listar';
import Roles from './rol';

const menuItems = (usuario) => {
  let items = [];

  if (usuario === 'Aprendiz' || usuario === 'Instructor') {
    items = [Prestamo];
  } else if (usuario === 'Administrador') {
    items = [dashboard,Roles, Imagen, informe , Prestamo,LPrestamo, Sanciones, Inplemento, utilities];
  }

  return { items };
};

export default menuItems;
