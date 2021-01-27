import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { Navbar } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar />}
        <div id="fl" className="film-list" style={{width:'65%', marginLeft:'12%'}}>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
