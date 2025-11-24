import { dataGames } from '@/src/data/games';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const game = dataGames.find((g) => g.id.toString() === id);

  if (!game) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Jogo não encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title} > {game.title} </Text>
      <Text style={styles.gameText} > Data de Lançamento: {game.release_date} </Text>
      <Text style={styles.gameText} > {game.info_game} </Text>
      <Text style={styles.gameDev} > {game.dev_game} </Text>
      <Text style={styles.price} >R$ {game.price} </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  image: { width: '100%', height: 250, borderRadius: 8, marginBottom: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { color: '#00FF88', fontSize: 18 },
  gameText: {color: '#fff', fontSize: 14, marginBottom: 8, marginTop: 8 },
  gameDev: {color: '#fff', fontSize: 18, marginBottom: 25, marginTop: 10, fontStyle: "italic" }
});
