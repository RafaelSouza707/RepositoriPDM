import { Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { dataGames } from '@/src/data/games';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const game = dataGames.find((g) => g.id.toString() === id);

  if (!game) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Jogo não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title} > {game.title} </Text>
      <Text style={styles.gameText} > Data de Lançamento: {game.release_data} </Text>
      <Text style={styles.gameText} > {game.info_game} </Text>
      <Text style={styles.price} >R$ {game.price} </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  image: { width: '100%', height: 240, borderRadius: 8, marginBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { color: '#00FF88', fontSize: 18 },
  gameText: {color: '#fff', fontSize: 14, marginBottom: 8, marginTop: 8 }
});
