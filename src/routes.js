const base = window.location.origin;

export const routes = {
    homeView: '/',
    loginView: '/login',
    registerView: '/register',
    accountView: '/account',
    planView: '/plan',

    get baseUrl() {
        return base;
    },
};
