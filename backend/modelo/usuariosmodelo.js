import { db } from './firebaseAdmin.js';

const coleccionUsuarios = db.collection('usuarios');

export async function crearUsuario(data) {
  const docRef = await coleccionUsuarios.add(data);
  return { id: docRef.id, ...data };
}

export async function obtenerUsuarios() {
  const snapshot = await coleccionUsuarios.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function actualizarUsuario(id, data) {
  await coleccionUsuarios.doc(id).update(data);
  return { id, ...data };
}

export async function eliminarUsuario(id) {
  await coleccionUsuarios.doc(id).delete();
  return { id };
}
