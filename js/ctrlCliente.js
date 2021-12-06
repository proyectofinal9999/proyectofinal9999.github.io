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
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
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
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoCliente.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Cliente} */
        const data = doc.data();
        forma.nombre.value = data.nombre;
        forma.modcel.value = data.modcel || "";
        forma.telefono.value = data.telefono || "";
        forma.tipfun.value = data.tipfun || "";
        forma.fecha.value = data.fecha || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró.");
      }
    } catch (e) {
      muestraError(e);
      muestraClientes();
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
        doc(id).
        set(modelo);
      muestraClientes();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoCliente.
          doc(id).
          delete();
        muestraClientes();
      }
    } catch (e) {
      muestraError(e);
    }
  }
  