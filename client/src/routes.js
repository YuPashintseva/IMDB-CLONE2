import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {AuthPage} from './pages/AuthPage';
import { StatisticPage } from './pages/StatisticPage';
import FilmPage from './components/FilmPage';

export const useRoutes = isAuthenticted => {
    if (isAuthenticted) {
        return (
            <Switch>
                <Route path="/watchlist" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/statistic" exact>
                    <StatisticPage />
                </Route>
                <Route path="/FilmPage">
                    <FilmPage />
                </Route>
                <Route path="/detail:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return  (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}