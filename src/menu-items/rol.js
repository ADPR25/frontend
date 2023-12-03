import {
    PlusCircleOutlined
} from '@ant-design/icons';

const icons = {
    PlusCircleOutlined
};

const Roles = {
    id: 'rol',
    title: 'Rol',
    type: 'group',
    children: [
        {
            id: 'crear_Rol',
            title: 'crear roles',
            type: 'item',
            url: '/rol',
            icon: icons.PlusCircleOutlined
        },
    ]
};

export default Roles;
