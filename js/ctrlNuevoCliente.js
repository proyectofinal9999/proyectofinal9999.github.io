import {
    getAuth,
    getFirestore
  } from "../lib/BDfirebase.js";
  import {
    getString,
    muestraError
  } from "../lib/errorConsol.js";
  import {
    muestraClientes
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoCliente =
    getFirestore().
      collection("Cliente");
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/datosFirebase.js").User}
      comprador */
  async function protege(comprador) {
    if (tieneRol(comprador,
      ["Administrador"])) {
      forma.addEventListener(
        "submit", guarda);
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const nombre = getString(formData, "nombre").trim();  
      const modcel = getString(formData, "modcel").trim();
      const telefono = getString(formData, "telefono").trim();
      const tipfun = getString(formData, "tipfun").trim();
      const fecha = getString(formData, "fecha").trim();
      /**
       * @type {
          import("./tipos.js").
                  Cliente} */
      const modelo = {
        nombre,
        modcel,
        telefono,
        tipfun,
        fecha 
      };
      await daoCliente.
        add(modelo);
      muestraClientes();
    } catch (e) {
      muestraError(e);
    }
  }