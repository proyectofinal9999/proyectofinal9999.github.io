import { getAuth,
  getFirestore
} from "../lib/bdFirebase.js";
import {
  muestraError
} from "../lib/errorConsol.js";

const firestore = getFirestore();
const daoGeneral = firestore.
  collection("General");

export async function sesionOn() {
  /** Tipo de autenticación de
   * usuarios. En este caso es con
   * Google.
   * @type {import("../lib/datosFire.js").GoogleAuthProvider} */
  const provider =
    // @ts-ignore
    new firebase.auth.
      GoogleAuthProvider();
  /* Configura el proveedor de
   * Google para que permita
   * seleccionar de una lista. */
  provider.setCustomParameters(
    { prompt: "select_account" });
  await getAuth().
    signInWithRedirect(provider);
}
/** @param {import(
    "../lib/datosFire.js").User}
    general
 * @param {string[]} roles
 * @returns {Promise<boolean>} */
export async function
  tieneRol(general, roles) {
  if (general && general.email) {
    const rolIds =
      await cargaRoles(
        general.email);
    for (const rol of roles) {
      if (rolIds.has(rol)) {
        return true;
      }
    }
    alert("No autorizado.");
    location.href = "index.html";
  } else {
    sesionOn();
  }
  return false;
}

export async function
  sesionOff() {
  try {
    await getAuth().signOut();
  } catch (e) {
    muestraError(e);
  }
}

/** @param {string} email
 * @returns {Promise<Set<string>>}
 */
export async function
  cargaRoles(email) {
  let doc =
    await daoGeneral.
      doc(email).
      get();
  if (doc.exists) {
    /**
     * @type {
        import("./tipos.js").
        General} */
    const data = doc.data();
    return new Set(
      data.rolIds || []);
  } else {
    return new Set();
  }
}
