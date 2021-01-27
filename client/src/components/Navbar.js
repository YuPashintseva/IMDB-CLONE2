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
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Watchlist</Nav.Link>
          <Nav.Link href="#features">Statistic</Nav.Link>
          <Nav.Link href="#features" onClick={logoutHandler}>Log out</Nav.Link>
        </Nav>
      </MyBar>
    )
}

