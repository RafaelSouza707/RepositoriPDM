import { IGames } from '@/interfaces/IGames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from '../../components/GameCard';
import Header from '../../components/Header';
import { dataGames } from '../../src/data/games';


export default function Home() {
  const [games, setGames] = useState<IGames[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const saved = await AsyncStorage.getItem('@app_data_jogos');
      if (saved) {
        const parsed = JSON.parse(saved)
        setGames(parsed);
        console.log('Dados carregados do AsyncStorage');
      } else {
        await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(dataGames));
        setGames(dataGames);
        console.log("Dados inciais salvos no AsyncStorage");
      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais: ', error);
    }
  }

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="BuyGames" />
      <FlatList
        data={dataGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard
            title={item.title}
            price={item.price}
            image={item.image}
            onPress={() => router.push({ pathname: '/games/[id]', params: { id: item.id.toString() } })}
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
