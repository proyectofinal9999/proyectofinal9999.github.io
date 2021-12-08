import {
  getAuth
} from "../lib/bdFirebase.js";
import {
  muestraError
} from "../lib/errorConsol.js";
import {
  sesionOn,
  sesionOff
} from "./seguridad.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.
  querySelector("#avatar");

/* Escucha cambios de usuario.
 * El primer parámetro es una
 * función que se invoca cada que
 * hay un cambio de usuario y
 * recibe los datos del usuario.
 * El segundo parámetro es una
 * función que se invoca cuando se
 * presenta un error en un cambio
 * de usuario y recibe un Error.
 */
getAuth().onAuthStateChanged(
  muestraSesión, muestraError);

/** Muestra los datos del usuario
 * o manda a iniciar sesión en
 * caso de que no haya empezado.
 * @param {import(
    "../lib/datosFire").
    User} general modelo con las
 *    características del usuario
 *    o null si no ha iniciado
 *    sesión. */
async function
  muestraSesión(general) {
  if (general && general.email) {
    // Usuario General aceptado.
    forma.email.value =
      general.email || "";
    forma.nombre.value =
      general.displayName || "";
    avatar.src =
      general.photoURL || "";
    forma.terminarSesión.
      addEventListener(
        "click", sesionOff);
  } else {
    // No ha iniciado sesión.
    sesionOn();
  }
}
