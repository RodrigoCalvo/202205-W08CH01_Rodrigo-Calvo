import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import ValidateId from '../components/ValidateId';
import { loadRobotsAction } from '../reducers/robots/robot.action.creators';
import { RobotHttpStore } from '../services/robot.http.store';

export interface iRouterItem {
    path: string;
    label: string;
    page: JSX.Element;
}

export function App() {
    const dispatcher = useDispatch();
    const apiRobots = useMemo(() => new RobotHttpStore(), []);

    useEffect(() => {
        apiRobots
            .getAllRobots()
            .then((robots) => dispatcher(loadRobotsAction(robots)));
    }, [apiRobots, dispatcher]);

    const HomePage = React.lazy(() => import('../pages/home'));

    const routerOptions: Array<iRouterItem> = [
        { path: '/', label: 'Inicio', page: <HomePage></HomePage> },
        {
            path: '/details/:id',
            label: 'Detalles',
            page: <ValidateId edit={false}></ValidateId>,
        },
        {
            path: '/details/:id/edit',
            label: 'Editar',
            page: <ValidateId edit={true}></ValidateId>,
        },
    ];
    return (
        <Layout menuOptions={routerOptions}>
            <React.Suspense>
                <Routes>
                    {routerOptions.map((item) => (
                        <Route
                            key={item.label}
                            path={item.path}
                            element={item.page}
                        ></Route>
                    ))}
                </Routes>
            </React.Suspense>
        </Layout>
    );
}
