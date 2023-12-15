import { MailOutlined } from '@ant-design/icons';

const icons = {
    MailOutlined
};

const Correo = {
    id: 'Correo',
    title: 'Comentarios',
    type: 'group',
    children: [
        {
            id: 'Correp',
            title: 'Comentarios',
            type: 'item',
            url: '/Correo',
            icon: icons.MailOutlined
        }
    ]
};

export default Correo;
