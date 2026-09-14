import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function FocusScreen() {
  const [subject, setSubject] = useState('');
  const [minutes, setMinutes] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('5');
  const [result, setResult] = useState(null);

  function calculate() {
    const focus = Number(minutes.replace(',', '.'));
    const rest = Number(breakMinutes.replace(',', '.'));

    if (!subject.trim()) {
      Alert.alert('Informe a matéria', 'Digite o que você pretende estudar.');
      return;
    }
    if (!Number.isFinite(focus) || focus <= 0 || !Number.isFinite(rest) || rest < 0) {
      Alert.alert('Valores inválidos', 'Use números válidos para foco e intervalo.');
      return;
    }

    const cycle = focus + rest;
    const cyclesInTwoHours = Math.max(1, Math.floor(120 / cycle));
    const focusedInTwoHours = cyclesInTwoHours * focus;

    setResult({
      subject: subject.trim(),
      focus,
      rest,
      cycle,
      cyclesInTwoHours,
      focusedInTwoHours,
    });
  }

  function clear() {
    setSubject('');
    setMinutes('');
    setBreakMinutes('5');
    setResult(null);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.intro}>
          <Text style={styles.kicker}>INPUTS FUNCIONAIS</Text>
          <Text style={styles.title}>Monte uma sessão de foco.</Text>
          <Text style={styles.subtitle}>
            Preencha os campos e o aplicativo calcula ciclos possíveis em um período de duas horas.
          </Text>
        </View>

        <Text style={styles.label}>Matéria ou atividade</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Ex.: Matemática"
          placeholderTextColor="#968DA2"
        />

        <Text style={styles.label}>Minutos de foco</Text>
        <TextInput
          style={styles.input}
          value={minutes}
          onChangeText={setMinutes}
          placeholder="Ex.: 25"
          placeholderTextColor="#968DA2"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Minutos de intervalo</Text>
        <TextInput
          style={styles.input}
          value={breakMinutes}
          onChangeText={setBreakMinutes}
          placeholder="Ex.: 5"
          placeholderTextColor="#968DA2"
          keyboardType="numeric"
        />

        <Pressable style={styles.calculateButton} onPress={calculate}>
          <Text style={styles.calculateButtonText}>Calcular sessão</Text>
        </Pressable>

        <Pressable style={styles.clearButton} onPress={clear}>
          <Text style={styles.clearButtonText}>Limpar campos</Text>
        </Pressable>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>RESULTADO</Text>
            <Text style={styles.resultTitle}>{result.subject}</Text>
            <Text style={styles.resultText}>
              Cada ciclo terá {result.focus} min de foco + {result.rest} min de intervalo = {result.cycle} min.
            </Text>
            <View style={styles.resultRow}>
              <View style={styles.metric}>
                <Text style={styles.metricNumber}>{result.cyclesInTwoHours}</Text>
                <Text style={styles.metricLabel}>ciclos em 2h</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricNumber}>{result.focusedInTwoHours}</Text>
                <Text style={styles.metricLabel}>min de foco</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F7FC' },
  container: { padding: 20, paddingBottom: 44 },
  intro: { marginBottom: 22 },
  kicker: { color: '#7C3AED', fontSize: 12, fontWeight: '900', letterSpacing: 1.2 },
  title: { color: '#241B35', fontSize: 28, lineHeight: 34, fontWeight: '900', marginTop: 5 },
  subtitle: { color: '#6F667B', lineHeight: 22, marginTop: 7 },
  label: { color: '#342B3F', fontWeight: '800', marginBottom: 7 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6E8',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#241B35',
    marginBottom: 15,
  },
  calculateButton: { backgroundColor: '#6D28D9', borderRadius: 15, padding: 15, alignItems: 'center' },
  calculateButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  clearButton: { padding: 14, alignItems: 'center' },
  clearButtonText: { color: '#6D28D9', fontWeight: '800' },
  resultCard: { backgroundColor: '#2E1065', borderRadius: 20, padding: 20, marginTop: 10 },
  resultKicker: { color: '#C4B5FD', fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  resultTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginTop: 5 },
  resultText: { color: '#E9D5FF', lineHeight: 21, marginTop: 8 },
  resultRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  metric: { flex: 1, backgroundColor: '#4C1D95', borderRadius: 14, padding: 14 },
  metricNumber: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
  metricLabel: { color: '#DDD6FE', marginTop: 2, fontSize: 12 },
});
