import React from "react";
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

const ROUTES = [
    { path: "/", key: "main", exact: true, component: (props) => <MainPage  {...props}/> },
    {
        path: "/users",
        key: "users",
        exact: true,
        component: (props) => <UsersList {...props} />,
    },
    {
        path: "/users/:id",
        key: "user",
        component: (props) => <UserEdit {...props} />,
    },
    {
        path: "/createuser",
        key: "createuser",
        component: (props) => <NewUser {...props} />,
    },
    {
        path: "/buildings",
        key: "buildings",
        exact: true,
        component: (props) => <BuildingList {...props} />,
    },
    {
        path: "/createbuilding",
        key: "createbuilding",
        component: (props) => <NewBuilding {...props} />,
    },
    {
        path: "/buildings/:id",
        key: "building",
        component: (props) => <EditBuilding {...props} />,
    },
    {
        path: "/companies",
        key: "companies",
        exact: true,
        component: (props) => <CompaniesList {...props} />,
    },
    {
        path: "/createcompany",
        key: "createcompany",
        component: (props) => <NewCompany {...props} />,
    },
    {
        path: "/companies/:id/",
        key: "company",
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
    return (
        <>
            <Router history={history}>
                    <NavMenu />
                    <Switch>
                        {routes.map((route, i) => {
                            return <RouteWrapper key={route.key} {...route} />;
                        })}
                    <Route component={() => <h1>Not Found!</h1>} />
                </Switch>
            </Router>
        </>
    );
}