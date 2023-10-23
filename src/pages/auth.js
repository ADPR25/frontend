export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};
