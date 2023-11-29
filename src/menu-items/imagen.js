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

const Imagen = {
    id: 'Imagen',
    title: 'Imagen',
    type: 'group',
    children: [
        {
            id: 'crear_img',
            title: 'Crear imagen',
            type: 'item',
            url: '/Imagenes',
            icon: icons.PlusCircleOutlined
        },
    ]
};

export default Imagen;