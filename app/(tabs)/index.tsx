import { IGames } from '@/interfaces/IGames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from '../../components/GameCard';
import Header from '../../components/Header';
import { dataGames } from '../../src/data/games';

export default function Home() {
  const [games, setGames] = useState<IGames[]>([]);
  const router = useRouter();

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
      console.error('Erro ao carregar dados: ', error);
    }
  };

  // 🔁 Recarrega a lista toda vez que a tela voltar ao foco
  useFocusEffect(
    useCallback(() => {
      loadGames();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="BuyGames" />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() =>
              router.push({
                pathname: '/games/[id]',
                params: { id: item.id.toString() }
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  listContent: { padding: 16 },
});
