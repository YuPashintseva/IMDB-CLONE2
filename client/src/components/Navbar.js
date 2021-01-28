import React, {useCallback, useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar as MyBar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import mainLogo from './assets/logo-imdb.png';

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return (
      <MyBar bg="dark" variant="dark">
        <MyBar.Brand href="/">
          <div className="main-img-wrapper"><img className="navbar-mainlogo" src={mainLogo} ></img></div>
        </MyBar.Brand>
        <Nav className="mr-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/watchlist">Watchlist</NavLink>
          <NavLink to="/statistic">Statistic</NavLink>
          <NavLink to="/" onClick={logoutHandler}>Log out</NavLink>
        </Nav>
      </MyBar>
    )
}

