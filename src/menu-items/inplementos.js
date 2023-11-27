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
            id: 'listar_i',
            title: 'inventario',
            type: 'item',
            url: '/Inventario',
            icon: icons.OrderedListOutlined
        },
      
        
    ]
};

export default Inplemento;
