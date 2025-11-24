import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import ModalScreen from '@/components/modal';
import { ThemedView } from '@/components/themed-view';
import { IGames } from '@/interfaces/IGames';
import { dataGames } from '@/src/data/games';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReadScreen() {
  const [games, setGames] = useState<IGames[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => { 
    loadGames();
  }, []);

  const router = useRouter();

  const loadGames = async () => {
    try {
      const saved = await AsyncStorage.getItem('@app_data_jogos');
      if (saved) {
        setGames(JSON.parse(saved));
        console.log('Dados carregados do AsyncStorage');  
      } else {
        await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(dataGames));
        setGames(dataGames);
        console.log('Dados salvos no AsyncStorage');
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais: ', error);
    }
  };

  const saveGame = async (novoGame: IGames) => {
    try {
      const jsonGames = await AsyncStorage.getItem('@app_data_jogos');
      const listaGames = jsonGames ? JSON.parse(jsonGames) : [];
      listaGames.push(novoGame);
      await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(listaGames));
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };
 
  const onAdd = (title: string, price: string, image: string) => {
    const newGame: IGames = {
      id: games.length + 1,
      title,
      price,
      image,
    };
    const updateGames = [...games, newGame];
    setGames(updateGames);
    saveGame(newGame);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Header title="BuyGames" />

        <ThemedView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
              router.push({ pathname: "/games/[id]", params: { id: item.id.toString() } });
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
    backgroundColor: '#ecd503ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    color: '#0400ffff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
  },
});

