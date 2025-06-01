import { db } from './firebaseAdmin.js';

const coleccionLicores = db.collection('licores');

export async function crearLicor(data) {
  const docRef = await coleccionLicores.add(data);
  return { id: docRef.id, ...data };
}

export async function obtenerLicores() {
  const snapshot = await coleccionLicores.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function actualizarLicor(id, data) {
  await coleccionLicores.doc(id).update(data);
  return { id, ...data };
}

export async function eliminarLicor(id) {
  await coleccionLicores.doc(id).delete();
  return { id };
}
