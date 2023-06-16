const base = window.location.origin;

export const routes = {
    homeView: '/pyramiden',
    loginView: '/pyramiden/login',
    registerView: '/pyramiden/register',
    accountView: '/pyramiden/account',
    planView: '/pyramiden/plan',
    planViewById: (planId) => `/pyramiden/plan?id=${planId}`,

    get baseUrl() {

        return base;
    },
};
