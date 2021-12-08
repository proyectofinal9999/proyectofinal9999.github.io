import {
  getAuth,
  getFirestore
} from "../lib/bdFirebase.js";
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
    "../lib/datosFire.js").User}
    general */
async function protege(general) {
  if (tieneRol(general,
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
    const tipo = getString(formData, "tipo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Cliente} */
    const modelo = {
      nombre,
      modcel,
      telefono,
      tipo,
      fecha 
    };
    await daoCliente.
      add(modelo);
    muestraClientes();
  } catch (e) {
    muestraError(e);
  }
}

