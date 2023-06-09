import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginView } from '../../views/LoginView/LoginView';
import { RegisterView } from '../../views/RegisterView/RegisterView';
// import { AccountView } from '../../views/AccountView/AccountView';
import { PlanView } from '../../views/PlanView/PlanView';
import { routes } from '../../routes';
// import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const MainRouterContainer = () => {
    return (
        <Routes>
            <Route path={routes.homeView} element={<LoginView />} />
            <Route path={routes.loginView} element={<LoginView />} />
            <Route path={routes.registerView} element={<RegisterView />} />
            {/*<Route path={routes.accountView} element={<AccountView />} />*/}
            <Route path={routes.planView} element={<PlanView />}/>
        </Routes>
    );
};
