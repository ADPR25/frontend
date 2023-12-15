

import {
    OrderedListOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const icons = {
    OrderedListOutlined,
    CalendarOutlined
};

const LPrestamo2 = {
    id: 'prestamo2',
    type: 'group',
    children: [
        {
            id: 'crear_p',
            title: 'crear prestamos',
            type: 'item',
            url: '/Prestar',
            icon: icons.CalendarOutlined
        },
        {
            id: 'M_prestamos',
            title: 'Mi Prestamo',
            type: 'item',
            url: '/Prestamos',
            icon: icons.CalendarOutlined
        },
    ],
};

export default LPrestamo2;




