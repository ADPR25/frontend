import {
    PlusCircleOutlined
} from '@ant-design/icons';

const icons = {
    PlusCircleOutlined
};

const Roles = {
    id: 'rol',
    title: 'Crear',
    type: 'group',
    children: [
        {
            id: 'crear_Rol',
            title: 'crear roles',
            type: 'item',
            url: '/rol',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crearEps',
            title: 'crear eps',
            type: 'item',
            url: '/EPS',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crearjornada',
            title: 'crear jornada',
            type: 'item',
            url: '/Jornada',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crearnivelformacion',
            title: 'crear nivel formacion',
            type: 'item',
            url: '/NivelFormacion',
            icon: icons.PlusCircleOutlined
        },
        {
            id: 'crearestadoImplemento',
            title: 'crear estado implemento',
            type: 'item',
            url: '/EstadoImplemento',
            icon: icons.PlusCircleOutlined
        },
    ]
};

export default Roles;
