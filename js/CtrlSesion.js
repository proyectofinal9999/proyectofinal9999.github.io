import {
  getAuth
} from "../lib/bdFirebase.js";
import {
  muestraError
} from "../lib/errorConsol.js";
import {
  sesionOn, sesionOff
} from "./seguridad.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.querySelector("#avatar");

getAuth().onAuthStateChanged(muestraSesión, muestraError);

/** 
 * @param {import(
    "../lib/datosFire").
    User} general */
async function muestraSesión(general) {
  if (general && general.email) {
    forma.email.value = general.email || "";
    forma.nombre.value = general.displayName || "";
    avatar.src = general.photoURL || "";
    forma.terminarSesión.addEventListener("click", sesionOff);
  } else {
    sesionOn();
  }
}
