import { Grid, Typography } from '@material-ui/core';

import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Paso3DDJJ({ informacionSeleccionada }) {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Grid container alignItems="flex-end" spacing={4}>
        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre de la actividad:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividad.nombre}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora de inicio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {DateTime.fromISO(informacionSeleccionada.actividad.fechaHoraInicio)
              .setLocale('es')
              .toFormat('dd/MM HH:mm')}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Fecha y hora final:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {DateTime.fromISO(informacionSeleccionada.actividad.fechaHoraFin)
              .setLocale('es')
              .toFormat('dd/MM HH:mm')}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del espacio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividad.Espacio.nombre}
          </Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del edificio:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <Typography variant="subtitle1">
            {informacionSeleccionada.actividad.Espacio.Edificio.nombre}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

Paso3DDJJ.propTypes = {
  informacionSeleccionada: PropTypes.object,
};