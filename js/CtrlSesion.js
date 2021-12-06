import {
    getAuth
  } from "../lib/BDfirebase.js";
  import {
    muestraError
  } from "../lib/errorConsol";
  import {
    iniciaSesión,
    terminaSesión
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
      "../lib/datosFirebase").
      User} comprador modelo con las
   *    características del usuario
   *    o null si no ha iniciado
   *    sesión. */
  async function
    muestraSesión(comprador) {
    if (comprador && comprador.email) {
      // Comprador aceptado.
      forma.email.value =
        comprador.email || "";
      forma.nombre.value =
        comprador.displayName || "";
      avatar.src =
        comprador.photoURL || "";
      forma.terminarSesión.
        addEventListener(
          "click", terminaSesión);
    } else {
      // No has iniciado sesión.
      iniciaSesión();
    }
  }