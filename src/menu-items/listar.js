import {
    OrderedListOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const icons = {
    OrderedListOutlined,
    CalendarOutlined
};

const LPrestamo = {
    id: 'prestamo',
    type: 'group',
    children: [
        {
            id: 'listar_p',
            title: 'listar prestamos',
            type: 'item',
            url: '/Lista_prestamos',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default LPrestamo;
