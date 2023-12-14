

import {
    OrderedListOutlined,
    CalendarOutlined
} from '@ant-design/icons';

const icons = {
    OrderedListOutlined,
    CalendarOutlined
};

const sancion_user = {
    id: 'sancion',
    type: 'group',
    children: [
        {
            id: 'Sancion',
            title: 'Mis sanciones',
            type: 'item',
            url: '/Sancion',
            icon: icons.CalendarOutlined
        },
    ]
};

export default sancion_user;