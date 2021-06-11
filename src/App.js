import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import AltaModificacionActividad from './components/actividades/AltaModificacionActividad';
import AltaModificacionEspacio from './components/espacios/AltaModificacionEspacio';
import { Box, Container, makeStyles } from '@material-ui/core';
import ControlAcceso from './components/actividades/ControlAcceso';
import RecuperarContrasenia from './components/login/RecuperarContrasenia';
import Header from './components/ui/Header';
import InscripcionActividad from './components/inscripcionTurnos/InscripcionActividad';
import FinalDDJJ from './components/inscripcionTurnos/FinalDDJJ';
import ListadoActividades from './components/actividades/ListadoActividades';
import ListadoEspacios from './components/espacios/ListadoEspacios';
import Login from './components/login/Login';
import PrivateRoute from './components/autenticacion/PrivateRoute';
import Footer from './components/ui/Footer';
import Registro from './components/registro/Registro';
import { useRecoilValue } from 'recoil';
import {
  hayUsuarioLogueadoState,
  rutaInicialUsuarioState,
} from './state/usuario';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Cargando from './components/ui/Cargando';
import ErrorInesperado from './components/ui/ErrorInesperado';
import MisActividades from './components/actividades/MisActividades';
import { NuevaContraseña } from './components/login/NuevaContraseña';

function Rutas() {
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);
  const rutaInicialUsuario = useRecoilValue(rutaInicialUsuarioState);

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/usuario/:dni/recuperar/:token">
        <NuevaContraseña />
      </Route>

      <Route path="/recuperar">
        <RecuperarContrasenia />
      </Route>

      <Route path="/registro">
        <Registro />
      </Route>

      <PrivateRoute exact path="/espacios" rolesPermitidos={['admin']}>
        <ListadoEspacios />
      </PrivateRoute>

      <PrivateRoute path="/espacios/nuevo" rolesPermitidos={['admin']}>
        <AltaModificacionEspacio titulo={'Carga de espacios'} />
      </PrivateRoute>

      <PrivateRoute path="/espacios/:id" rolesPermitidos={['admin']}>
        <AltaModificacionEspacio titulo={'Modificar espacio'} />
      </PrivateRoute>

      <PrivateRoute path="/actividades/nueva" rolesPermitidos={['admin']}>
        <AltaModificacionActividad titulo={'Carga de actividades'} />
      </PrivateRoute>

      <PrivateRoute path="/actividades/hoy" rolesPermitidos={['bedel']}>
        <ControlAcceso />
      </PrivateRoute>

      <PrivateRoute
        path="/actividades/:id/duplicar"
        rolesPermitidos={['admin']}
      >
        <AltaModificacionActividad
          titulo={'Duplicar actividad'}
          esParaDuplicar={true}
        />
      </PrivateRoute>

      <PrivateRoute path="/actividades/:id" rolesPermitidos={['admin']}>
        <AltaModificacionActividad titulo={'Modificar actividad'} />
      </PrivateRoute>

      <PrivateRoute path="/actividades" rolesPermitidos={['admin']}>
        <ListadoActividades />
      </PrivateRoute>

      <PrivateRoute path="/turnos/nuevo" rolesPermitidos={['asistente']}>
        <InscripcionActividad />
      </PrivateRoute>

      <PrivateRoute path="/turnos/confirmacion" rolesPermitidos={['asistente']}>
        <FinalDDJJ />
      </PrivateRoute>

      <PrivateRoute path="/turnos" rolesPermitidos={['asistente']}>
        <MisActividades />
      </PrivateRoute>

      <Route path="/">
        <Redirect to={hayUsuarioLogueado ? rutaInicialUsuario : '/login'} />
      </Route>
    </Switch>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    minHeight: '72vh',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Box>
      <Router>
        <Header />
        <Container className={classes.root}>
          <Suspense fallback={<Cargando />}>
            <ErrorBoundary fallback={<ErrorInesperado />}>
              <Rutas />
            </ErrorBoundary>
          </Suspense>
        </Container>
        <Footer />
      </Router>
    </Box>
  );
}
