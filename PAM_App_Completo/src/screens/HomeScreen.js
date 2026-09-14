import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const illustration = 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=80';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PAM • Projeto integrado</Text>
        </View>
        <Text style={styles.title}>Organize seus estudos sem complicação.</Text>
        <Text style={styles.subtitle}>
          Um aplicativo simples para criar tarefas, acompanhar sua lista e calcular sessões de foco.
        </Text>
      </View>

      <Image source={{ uri: illustration }} style={styles.image} resizeMode="cover" />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>recursos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>local</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>O que você quer fazer?</Text>

      <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Tarefas')}>
        <Text style={styles.primaryButtonTitle}>Abrir lista de tarefas</Text>
        <Text style={styles.primaryButtonText}>Adicionar, concluir e excluir itens usando FlatList.</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Foco')}>
        <Text style={styles.secondaryButtonTitle}>Calcular tempo de foco</Text>
        <Text style={styles.secondaryButtonText}>Use inputs funcionais para montar uma sessão de estudos.</Text>
      </Pressable>

      <Text style={styles.footer}>
        Desenvolvido em React Native + Expo para as atividades de PAM.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 36, backgroundColor: '#F8F7FC' },
  hero: { marginBottom: 18 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 999,
    marginBottom: 14,
  },
  badgeText: { color: '#6D28D9', fontSize: 12, fontWeight: '800' },
  title: { color: '#241B35', fontSize: 31, lineHeight: 37, fontWeight: '900' },
  subtitle: { color: '#655C72', fontSize: 16, lineHeight: 24, marginTop: 10 },
  image: { width: '100%', height: 190, borderRadius: 22, backgroundColor: '#DDD6FE' },
  statsRow: { flexDirection: 'row', gap: 12, marginVertical: 18 },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE8F4',
  },
  statNumber: { fontSize: 22, fontWeight: '900', color: '#6D28D9' },
  statLabel: { color: '#746A80', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#241B35', marginBottom: 10 },
  primaryButton: { backgroundColor: '#6D28D9', padding: 18, borderRadius: 18, marginBottom: 12 },
  primaryButtonTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  primaryButtonText: { color: '#E9D5FF', lineHeight: 20, marginTop: 5 },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  secondaryButtonTitle: { color: '#5B21B6', fontSize: 17, fontWeight: '900' },
  secondaryButtonText: { color: '#655C72', lineHeight: 20, marginTop: 5 },
  footer: { textAlign: 'center', color: '#8A8195', fontSize: 12, marginTop: 28 },
});
