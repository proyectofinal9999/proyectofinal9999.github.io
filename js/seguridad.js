import {
    getAuth,
    getFirestore
  } from "../lib/BDfirebase.js";
  import {
    muestraError
  } from "../lib/errorConsol.js";
  
  const firestore = getFirestore();
  const daoComprador = firestore.
    collection("Cliente");
  
  export async function
    iniciaSesión() {
    /** Tipo de autenticación de
     * usuarios. En este caso es con
     * Google.
     * @type {import(
        "../lib/datosFirebase.js").
        GoogleAuthProvider} */
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
      "../lib/datosFirebase.js").User}
      comprador
   * @param {string[]} roles
   * @returns {Promise<boolean>} */
  export async function
    tieneRol(comprador, roles) {
    if (comprador && comprador.email) {
      const rolIds =
        await cargaRoles(
          comprador.email);
      for (const rol of roles) {
        if (rolIds.has(rol)) {
          return true;
        }
      }
      alert("No esta autorizado.");
      location.href = "index.html";
    } else {
      iniciaSesión();
    }
    return false;
  }
  
  export async function
    terminaSesión() {
    try {
      await getAuth().signOut();
    } catch (e) {
      muestraError(e);
    }
  }
  
  /** @param {string} email
   * @returns {Promise<Set<string>>}
   */
  export async function cargaRoles(email) {
    let doc = await daoComprador.doc(email).get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
          Comprador} */
      const data = doc.data();
      return new Set(data.rolIds || []);
    } else {
      return new Set();
    }
  }