import GameCard from "@/components/GameCard";
import Header from "@/components/Header";
import ModalScreen from '@/components/modal';
import { ThemedView } from '@/components/themed-view';
import { IGames } from '@/interfaces/IGames';
import { dataGames } from '@/src/data/games';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function readScreen() {

  const [games, setGames] = useState<IGames[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect( ()=> {
    setGames(dataGames);
  }, []);

  const onAdd = (title: string, price: string, image: string) => {
    const newGame: IGames = {
      id: games.length + 1,
      title: title,
      price: price,
      image: image
    };

    const gamesAdd: IGames[] = [
      ...games,
      newGame
    ]
  
    setGames(gamesAdd);
    setModalVisible(false);

    
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header title="BuyGames" />

      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={ ()=> openModal() }>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard title={item.title} price={item.price} image={item.image} />
        )}
        contentContainerStyle={styles.listContent}
      />

      <ModalScreen
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    left: 0,
  },
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