import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function ConfirmarEliminacion({
  abrirModal,
  setAbrirModal,
  ruta,
  entidadAEliminar,
}) {
  const notificarActualizacion = useNotificarActualizacion(ruta);
  const { deleteById } = useApi(ruta);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = async () => {
    await deleteById(entidadAEliminar.id);
    notificarActualizacion();
    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        ¿Confirma que desea eliminar <strong>{entidadAEliminar?.nombre}</strong>
        ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={cerrarModal}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={eliminar}>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmarEliminacion.propTypes = {
  abrirModal: PropTypes.bool,
  setAbrirModal: PropTypes.func,
  ruta: PropTypes.string,
  entidadAEliminar: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
  }),
};
