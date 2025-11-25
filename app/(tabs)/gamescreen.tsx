import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModalScreen from '@/components/modal';
import { ThemedView } from '@/components/themed-view';
import { IGames } from '@/interfaces/IGames';
import { dataGames } from '@/src/data/games';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GamesScreen() {
  const [games, setGames] = useState<IGames[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [])
  );

  const loadGames = async () => {
    try {
      const saved = await AsyncStorage.getItem('@app_data_jogos');
      if (saved) {
        setGames(JSON.parse(saved));
      } else {
        await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(dataGames));
        setGames(dataGames);
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais: ', error);
    }
  };

  const saveGame = async (novoGame: IGames) => {
    const listaGames = [...games, novoGame];
    await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(listaGames));
    setGames(listaGames);
  };

  const onAdd = (title: string, price: string, image: string) => {
    const newGame: IGames = {
      id: games.length > 0 ? games[games.length - 1].id + 1 : 1,
      title,
      price,
      image,
    };
    saveGame(newGame);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="BuyGames" />

      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/screens/gamesDetailsScreen",
              params: {}
            })
          }
        >
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      {games.length > 0 ? (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              price={item.price}
              image={item.image}
              onPress={() => {
                router.push({
                  pathname: "/screens/gamesDetailsScreen",
                  params: { id: item.id.toString() }
                });
              }}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
          Nenhum jogo encontrado.
        </Text>
      )}

      {modalVisible && (
        <ModalScreen
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onAdd={onAdd}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    backgroundColor: '#ecd503',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    color: '#0400ff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
  },
});
