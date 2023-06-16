const base = window.location.origin;

export const routes = {
    homeView: '/',
    loginView: '/login',
    registerView: '/register',
    accountView: '/account',
    planView: '/plan',
    planViewById: (planId) => `/plan?id=${planId}`,

    get baseUrl() {
        return base;
    },
};
