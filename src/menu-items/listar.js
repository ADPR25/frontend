import {
    OrderedListOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const icons = {
    OrderedListOutlined,
    CalendarOutlined
};

const Prestamo = {
    id: 'prestamo',
    title: 'Prestamo',
    type: 'group',
    children: [
        {
            id: 'listar_p',
            title: 'listar prestamos',
            type: 'item',
            url: '/Lista_prestamos',
            icon: icons.OrderedListOutlined
        },
        {
            id: 'listar_p',
            title: 'Prestamos',
            type: 'item',
            url: '/Prestar_admin',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default Prestamo;
