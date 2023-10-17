import {
    PlusCircleOutlined,
    OrderedListOutlined,
    FormatPainterOutlined,
    ZoomInOutlined
} from '@ant-design/icons';

const icons = {
    PlusCircleOutlined,
    OrderedListOutlined,
    FormatPainterOutlined,
    ZoomInOutlined
};

const Inplemento = {
    id: 'inplementos',
    title: 'implementos',
    type: 'group',
    children: [
        {
            id: 'crear_i',
            title: 'Implemento en solicitud',
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
        },
        {
            id: 'Mantenimiento',
            title: 'Mantenimiento',
            type: 'item',
            url: '/Mantenimiento',
            icon: icons.FormatPainterOutlined
        },
        {
            id: 'Uso',
            title: 'En uso',
            type: 'item',
            url: '/uso',
            icon: icons.ZoomInOutlined
        },
        
    ]
};

export default Inplemento;
