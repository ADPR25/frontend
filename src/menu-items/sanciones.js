import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined,
    WarningOutlined,
    OrderedListOutlined
} from '@ant-design/icons';

const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    WarningOutlined,
    OrderedListOutlined
};

const Sanciones = {
    id: 'sanciones',
    title: 'Sanciones',
    type: 'group',
    children: [
        {
            id: 'crear_s',
            title: 'crear sanciones',
            type: 'item',
            url: '/Crear_sanciones',
            icon: icons.WarningOutlined
        },
        {
            id: 'listar_s',
            title: 'listar sanciones',
            type: 'item',
            url: '/Listar_sanciones',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default Sanciones;
