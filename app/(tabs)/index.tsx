import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import GameCard from '../../components/GameCard';
import { dataGames } from '../../src/data/games';

export default function Home() {
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
