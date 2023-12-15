import { MailOutlined } from '@ant-design/icons';

const icons = {
    MailOutlined
};

const Correo2 = {
    id: 'Comentarios',
    title: 'Comentarios',
    type: 'group',
    children: [
        {
            id: 'Comentarios',
            title: 'Comentarios',
            type: 'item',
            url: '/comentarios',
            icon: icons.MailOutlined
        }
    ]
};

export default Correo2;
