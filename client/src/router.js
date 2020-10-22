import React, {useContext} from "react";
import {
    Switch,
    Route, Router,
} from "react-router-dom";
import history from './utils'
import UsersList from "./pages/userPages/UsersList";
import UserEdit from "./pages/userPages/UserEdit";
import NewUser from "./pages/userPages/NewUser";
import BuildingList from "./pages/buildingPages/BuildingsList";
import NewBuilding from "./pages/buildingPages/NewBuilding";
import EditBuilding from "./pages/buildingPages/EditBuilding";
import CompaniesList from "./pages/companyPages/CompaniesList";
import NewCompany from './pages/companyPages/NewCompany';
import EditCompany from "./pages/companyPages/EditCompany";
import NavMenu from "./components/NavMenu";
import MainPage from "./pages/MainPage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import LogOut from "./components/LogOut";
import {ContextApp} from "./reducers";

const ROUTES = [
    { path: "/", key: "main",
        accessRoles: ['internal_admin'],
        exact: true, component: (props) => <MainPage  {...props}/> },
    {
        path: "/users",
        key: "users",
        exact: true,
        accessRoles: ['internal_admin'],
        component: (props) => <UsersList {...props} />,
    },
    {
        path: "/users/:id",
        key: "user",
        accessRoles: ['internal_admin', 'company_worker'],
        component: (props) => <UserEdit {...props} />,
    },
    {
        path: "/createuser",
        key: "createuser",
        accessRoles: ['internal_admin'],
        component: (props) => <NewUser {...props} />,
    },
    {
        path: "/buildings",
        key: "buildings",
        exact: true,
        accessRoles: ['internal_admin'],
        component: (props) => <BuildingList {...props} />,
    },
    {
        path: "/createbuilding",
        key: "createbuilding",
        accessRoles: ['internal_admin'],
        component: (props) => <NewBuilding {...props} />,
    },
    {
        path: "/buildings/:id",
        key: "building",
        accessRoles: ['internal_admin', 'building_admin', 'building_manager'],
        component: (props) => <EditBuilding {...props} />,
    },
    {
        path: "/companies",
        key: "companies",
        exact: true,
        accessRoles: ['internal_admin'],
        component: (props) => <CompaniesList {...props} />,
    },
    {
        path: "/createcompany",
        key: "createcompany",
        accessRoles: ['internal_admin'],
        component: (props) => <NewCompany {...props} />,
    },
    {
        path: "/companies/:id/",
        key: "company",
        accessRoles: ['internal_admin', 'company_admin'],
        component: (props) => <EditCompany {...props} />,
    },
];

export default ROUTES;


function RouteWrapper(route) {
        return (
            <Route
                path={route.path}
                exact={route.exact}
                render={props => <route.component {...props} routes={route.routes} />}
            />
        );
}

export function RenderRoutes({ routes }) {
    const {store} = useContext(ContextApp);
    return (
        <>
            <Router history={history}>
                {store.role && <LogOut/>}
                {store.role === 'internal_admin' &&  <NavMenu />}
                    <Switch>
                        <Route path={'/login'} component={(props) => <Login {...props} />} />
                        <Route path={'/registration'} component={(props) => <Registration {...props} />} />
                        {routes.map((route, i) => {
                            return <RouteWrapper key={route.key} {...route} />;
                        })}
                    <Route component={() => <h1>Not Found!</h1>} />
                </Switch>
            </Router>
        </>
    );
}
