import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  nome: string;
  data_fundacao?: string;
  jogos_desenvolvidos?: string;
  image?: string;
  onPress?: () => void;
};

export default function CardDev({ nome, data_fundacao, image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : <View style={styles.placeholder}><Text></Text></View>}
      <View style={styles.info}>
        <Text style={styles.title}>{nome}</Text>
        {data_fundacao ? <Text style={styles.subtitle}>Fundada: {data_fundacao}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1f1f1f', borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  image: { width: '100%', height: 140 },
  placeholder: { width: '100%', height: 140, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
  info: { padding: 12 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subtitle: { color: '#ccc', fontSize: 12, marginTop: 4 },
});
