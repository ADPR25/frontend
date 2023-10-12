import {
    PlusCircleOutlined,
    OrderedListOutlined
} from '@ant-design/icons';

const icons = {
    PlusCircleOutlined,
    OrderedListOutlined
};

const Inplemento = {
    id: 'inplementos',
    title: 'inplementos',
    type: 'group',
    children: [
        {
            id: 'crear_i',
            title: 'Inplemento en solicitud',
            type: 'item',
            url: '/CrearInplementos',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'listar_i',
            title: 'inventario',
            type: 'item',
            url: '/Inventario',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default Inplemento;
