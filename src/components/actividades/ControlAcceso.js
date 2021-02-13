import {
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import SelectorActividad from './SelectorActividad';
import { autorizacionesPorActividad } from '../../state/autorizaciones';
import { hourFormatter } from '../../utils/dateUtils';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16,
  },
  autocomplete: {
    width: 400,
  },
  icon: {
    marginRight: 16,
  },
  card: {
    maxWidth: 275,
    borderRadius: 20,
    borderColor: theme.palette.primary.main,
  },
  table: {
    maxWidth: '40%',
  },
  tableCell: {
    width: '50%',
  },
}));

export default function ControlAcceso() {
  const classes = useStyles();

  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(
    todasLasActividades({ desde: fechaActual, hasta: fechaActual })
  );

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  return (
    <>
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Actividades del día
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <SelectorActividad
            actividades={actividades}
            funcionOnChange={setActividadSeleccionada}
            deshabilitarSinCupo={false}
            agregarHorario={false}
            agregarInfo={false}
          />
        </Grid>

        <Grid item xs={12} align="center">
          {actividadSeleccionada && (
            <DatosActividad actividad={actividadSeleccionada} />
          )}
        </Grid>

        <Grid item xs={12} align="center">
          {actividadSeleccionada && (
            <ListadoAutorizaciones idActividad={actividadSeleccionada.id} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

function DatosActividad({ actividad }) {
  const classes = useStyles();
  const {
    nombre,
    Espacio,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
  } = actividad;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h6">{nombre}</Typography>
        <Typography variant="body1">{`Espacio: ${Espacio.nombre}`}</Typography>
        <Typography variant="body1">
          {`Edificio: ${Espacio.Edificio.nombre}`}
        </Typography>
        <Typography variant="body1">
          {`Horario: ${hourFormatter(fechaHoraInicio)} a ${hourFormatter(
            fechaHoraFin
          )}`}
        </Typography>
        <Typography variant="body1">{`Responsable: ${responsable}`}</Typography>
      </CardContent>
    </Card>
  );
}

function ListadoAutorizaciones({ idActividad }) {
  const classes = useStyles();
  const autorizaciones = useRecoilValue(
    autorizacionesPorActividad(idActividad)
  );

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              Asistente
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              DNI
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autorizaciones.map((autorizacion) => (
            <TableRow key={autorizacion.id}>
              <TableCell align="center">{`${autorizacion.Usuario.apellido} ${autorizacion.Usuario.nombre}`}</TableCell>
              <TableCell align="center">{`${autorizacion.Usuario.dni}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DatosActividad.propTypes = {
  actividad: PropTypes.object,
};

ListadoAutorizaciones.propTypes = {
  idActividad: PropTypes.number,
};
