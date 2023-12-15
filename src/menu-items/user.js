

import {
    UserOutlined
} from '@ant-design/icons';

const icons = {
    UserOutlined
};

const user = {
    id: 'user',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'Usuario',
            type: 'item',
            url: '/Profile',
            icon: icons.UserOutlined
        },
    ]
};

export default user; 