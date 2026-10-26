// Vraj
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { useUser } from '../context/AuthContext';
import { watchTasks, createTask, changeTask, deleteTask } from '../services/database';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const completed = useMemo(() => tasks.filter(task => task.done).length, [tasks]);
  useEffect(() => watchTasks(user.uid, items => {
    setTasks(items); setLoading(false); setError('');
  }, e => { setError(e.code || e.message); setLoading(false); }), [user.uid]);
  async function addTask() {
    if (busy) return;
    if (!title.trim() || title.trim().length > 150 || category.trim().length > 60) {
      setError('Digite um título de 1 a 150 caracteres e categoria de até 60.'); return;
    }
    setBusy(true); setError('');
    try { await createTask(user.uid, title, category); setTitle(''); setCategory(''); }
    catch (e) { setError(e.code || e.message); }
    finally { setBusy(false); }
  }
  async function toggleTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task || busy) return;
    setBusy(true); setError('');
    try { await changeTask(user.uid, id, !task.done); }
    catch (e) { setError(e.code || e.message); }
    finally { setBusy(false); }
  }
  async function removeTask(id) {
    if (busy) return;
    setBusy(true); setError('');
    try { await deleteTask(user.uid, id); }
    catch (e) { setError(e.code || e.message); }
    finally { setBusy(false); }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Progresso</Text>
        <Text selectable style={styles.summaryText}>UID: {user.uid}</Text>
        <Text style={styles.summaryNumber}>{completed}/{tasks.length}</Text>
        <Text style={styles.summaryText}>tarefas concluídas</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nova tarefa</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex.: Estudar para a prova"
          placeholderTextColor="#968DA2"
          style={styles.input}
          returnKeyType="next"
        />
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Categoria (opcional)"
          placeholderTextColor="#968DA2"
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+ Adicionar tarefa</Text>
        </Pressable>
      </View>

      {loading && <Text>Carregando tarefas...</Text>}
      {busy && <Text>Salvando alteração...</Text>}
      {!!error && <Text accessibilityRole="alert" style={{color: '#B42318', padding: 16}}>{error}</Text>}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={toggleTask} onRemove={removeTask} />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={<Text style={styles.listTitle}>Sua lista</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhuma tarefa ainda.</Text>
            <Text style={styles.emptyText}>Use os campos acima para criar a primeira.</Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F7FC' },
  summary: { margin: 16, backgroundColor: '#2E1065', borderRadius: 20, padding: 18 },
  summaryTitle: { color: '#DDD6FE', fontWeight: '700' },
  summaryNumber: { color: '#FFFFFF', fontSize: 28, fontWeight: '900', marginTop: 4 },
  summaryText: { color: '#C4B5FD' },
  form: { marginHorizontal: 16, marginBottom: 8 },
  label: { color: '#241B35', fontWeight: '900', fontSize: 17, marginBottom: 9 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6E8',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#241B35',
    marginBottom: 9,
  },
  addButton: { backgroundColor: '#7C3AED', borderRadius: 14, padding: 14, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontWeight: '900' },
  list: { padding: 16, paddingTop: 8, paddingBottom: 40 },
  listTitle: { color: '#241B35', fontWeight: '900', fontSize: 17, marginBottom: 10 },
  empty: { padding: 24, alignItems: 'center' },
  emptyTitle: { fontWeight: '800', color: '#4C4457' },
  emptyText: { color: '#857C91', marginTop: 4, textAlign: 'center' },
});
