// Vraj — CRUD de tarefas e armazenamento de planos de foco.
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query,
  serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
const userCollection = (uid, name) => collection(db, 'usuarios', uid, name);
export function watchTasks(uid, next, fail) {
  return onSnapshot(query(userCollection(uid, 'tarefas'), orderBy('createdAt', 'desc')),
    snapshot => next(snapshot.docs.map(item => ({ ...item.data(), id: item.id }))), fail);
}
export function createTask(uid, title, category) {
  return addDoc(userCollection(uid, 'tarefas'), {
    title: title.trim(), category: category.trim() || 'Geral', done: false,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}
export function changeTask(uid, id, done) {
  return updateDoc(doc(db, 'usuarios', uid, 'tarefas', id), { done, updatedAt: serverTimestamp() });
}
export function deleteTask(uid, id) {
  return deleteDoc(doc(db, 'usuarios', uid, 'tarefas', id));
}
export function saveFocus(uid, result) {
  return addDoc(userCollection(uid, 'sessoesFoco'), { ...result, createdAt: serverTimestamp() });
}
export function watchFocus(uid, next, fail) {
  return onSnapshot(query(userCollection(uid, 'sessoesFoco'), orderBy('createdAt', 'desc')),
    snapshot => next(snapshot.docs.map(item => ({ ...item.data(), id: item.id }))), fail);
}
