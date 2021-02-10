import { has } from 'ramda';
import { atom, selector, selectorFamily } from 'recoil';
import { localStorageEffect } from './effect';

export const usuarioState = atom({
  key: 'usuario',
  default: {},
  effects_UNSTABLE: [localStorageEffect('usuario_actual')],
});

export const hayUsuarioLogueadoState = selector({
  key: 'hayUsuarioLogueado',
  get: ({ get }) => has('token', get(usuarioState)),
});

export const tieneRolState = selectorFamily({
  key: 'tieneRol',
  get: (rolesPermitidos) => ({ get }) => {
    return rolesPermitidos.includes(get(usuarioState)?.rol);
  },
});

export const menuNavegacionState = selector({
  key: 'menuNavegacion',
  get: ({ get }) => {
    return listaRutas.filter((ruta) =>
      get(tieneRolState(ruta.rolesPermitidos))
    );
  },
});

const listaRutas = [
  {
    nombre: 'Actividades',
    ruta: '/actividades',
    rolesPermitidos: ['admin'],
  },
  {
    nombre: 'Espacios',
    ruta: '/espacios',
    rolesPermitidos: ['admin'],
  },
  {
    nombre: 'Autorización',
    ruta: '/autorizaciones/nueva',
    rolesPermitidos: ['asistente'],
  },
  {
    nombre: 'Control de acceso',
    ruta: '/actividades/hoy',
    rolesPermitidos: ['bedel'],
  },
];
