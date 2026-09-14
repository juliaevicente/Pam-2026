import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ item, onToggle, onRemove }) {
  return (
    <View style={[styles.card, item.done && styles.cardDone]}>
      <Pressable
        onPress={() => onToggle(item.id)}
        style={[styles.check, item.done && styles.checkDone]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.done }}
      >
        <Text style={styles.checkText}>{item.done ? '✓' : ''}</Text>
      </Pressable>

      <Pressable style={styles.content} onPress={() => onToggle(item.id)}>
        <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </Pressable>

      <Pressable onPress={() => onRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9E5F5',
  },
  cardDone: { opacity: 0.68 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: '#7C3AED' },
  checkText: { color: '#FFFFFF', fontWeight: '900' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#241B35' },
  titleDone: { textDecorationLine: 'line-through' },
  category: { fontSize: 12, color: '#786E88', marginTop: 3 },
  removeButton: { paddingVertical: 7, paddingHorizontal: 8 },
  removeText: { color: '#B42318', fontWeight: '700', fontSize: 12 },
});
