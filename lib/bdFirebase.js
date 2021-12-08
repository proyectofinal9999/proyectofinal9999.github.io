/** Conexión a la base de datos
 * de Firebase.
 *  @returns {
      import("./datosFire").
      Firestore} */
export function getFirestore() {
  // @ts-ignore
  return firebase.firestore();
}

/** Conexión al sistema de
 * autenticación de Firebase.
 *  @returns {
      import("./datosFire").
      Auth} */
export function getAuth() {
  // @ts-ignore
  return firebase.auth();
}

/** Conexión al sistema de
 * storage de Firebase.
 *  @returns {
      import("./datosFire").
      Storage} */
export function getStorage() {
  // @ts-ignore
  return firebase.storage();
}