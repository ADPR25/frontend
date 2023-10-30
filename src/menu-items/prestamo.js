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
            id: 'crear_p',
            title: 'crear prestamos',
            type: 'item',
            url: '/Prestar',
            icon: icons.CalendarOutlined
        },
        {
            id: 'listar_p',
            title: 'listar prestamos',
            type: 'item',
            url: '/Lista_prestamos',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default Prestamo;
