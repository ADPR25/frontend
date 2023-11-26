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
            title: 'Crear informes',
            type: 'item',
            url: '/Informes',
            icon: icons.PlusCircleOutlined
        },
    ]
};

export default informe;
