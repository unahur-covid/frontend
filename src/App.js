import { Box, Container } from '@material-ui/core';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import Header from './components/ui/Header';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import Registro from './components/registro/Registro';
import PropTypes from 'prop-types';
import estaAutorizadoState from './state/estaAutorizado';
import { useRecoilValue } from 'recoil';

export default function App() {
  const estaAutorizado = useRecoilValue(estaAutorizadoState);

  return (
    <Container>
      <Header />
      <Box my={4}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/registro">
              <Registro />
            </Route>

            <PrivateRoute
              exact
              path="/espacios"
              isAuthenticated={estaAutorizado}
            >
              <ListadoEspacios />
            </PrivateRoute>

            <PrivateRoute
              path="/espacios/nuevo"
              isAuthenticated={estaAutorizado}
            >
              <AltaModificacionEspacio titulo={'Carga de espacios'} />
            </PrivateRoute>

            <PrivateRoute path="/espacios/:id" isAuthenticated={estaAutorizado}>
              <AltaModificacionEspacio titulo={'Modificar espacio'} />
            </PrivateRoute>

            <PrivateRoute
              exact
              path="/actividades"
              isAuthenticated={estaAutorizado}
            >
              <ListadoActividades />
            </PrivateRoute>

            <PrivateRoute
              path="/actividades/nueva"
              isAuthenticated={estaAutorizado}
            >
              <AltaModificacionActividad titulo={'Carga de actividades'} />
            </PrivateRoute>

            <PrivateRoute
              path="/actividades/:id"
              isAuthenticated={estaAutorizado}
            >
              <AltaModificacionActividad titulo={'Modificar actividad'} />
            </PrivateRoute>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to={'/login'} />)}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
};
