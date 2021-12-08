/**
 *  @returns {
      import("./datosFire").
      Firestore} */
export function getFirestore() {
  // @ts-ignore
  return firebase.firestore();
}

/**
 *  @returns {
      import("./datosFire").
      Auth} */
export function getAuth() {
  // @ts-ignore
  return firebase.auth();
}

/**
 *  @returns {
      import("./datosFire").
      Storage} */
export function getStorage() {
  // @ts-ignore
  return firebase.storage();
}
