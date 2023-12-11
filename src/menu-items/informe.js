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

const informe = {
    id: 'Informe',
    title: 'Informes',
    type: 'group',
    children: [
        {
            id: 'crear_i',
            title: 'Crear informes implemento',
            type: 'item',
            url: '/Informes',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crear_i2',
            title: 'Crear informes inventario',
            type: 'item',
            url: '/Informes2',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crear_i3',
            title: 'Crear informes usuario',
            type: 'item',
            url: '/Informes3',
            icon: icons.PlusCircleOutlined
        },
    ]
};

export default informe;
