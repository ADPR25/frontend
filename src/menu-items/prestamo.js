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
            icon: icons.WarningOutlined
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
