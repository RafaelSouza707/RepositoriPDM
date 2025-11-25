import { IGames } from '@/interfaces/IGames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GamesDetailsScreen() {
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);

  const [game, setGame] = useState<IGames>({
    id: 0,
    title: "",
    price: "",
    image: "",
    release_date: "",
    dev_game: "",
    info_game: "",
  });

  const [games, setGames] = useState<IGames[]>([]);

  useEffect(() => {
    if (!isEditing) {
      setGame({
        id: 0,
        title: "",
        price: "",
        image: "",
        release_date: "",
        dev_game: "",
        info_game: "",
      });
    } else {
      loadGame();
    }
  }, [id]);

  const loadGame = async () => {
    const json = await AsyncStorage.getItem('@app_data_jogos');
    const storedGames: IGames[] = json ? JSON.parse(json) : [];
    setGames(storedGames);

    if (isEditing) {
      const selected = storedGames.find(item => item.id.toString() === id);
      if (selected) setGame(selected);
    }
  };

  const handleSave = async () => {
    if (!game.title || !game.price || !game.image) {
      Alert.alert("Erro", "Preencha título, preço e imagem!");
      return;
    }

    try {
      const saved = await AsyncStorage.getItem("@app_data_jogos");
      const lista: IGames[] = saved ? JSON.parse(saved) : [];

      let updatedList: IGames[] = [];

      if (isEditing) {
        updatedList = lista.map(item =>
          item.id === game.id ? game : item
        );
      } else {
        const newId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
        updatedList = [...lista, { ...game, id: newId }];
      }

      await AsyncStorage.setItem("@app_data_jogos", JSON.stringify(updatedList));
      router.back();
    } catch (e) {
      console.error("Erro ao salvar jogo:", e);
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;

    const updated = games.filter(item => item.id !== game.id);

    await AsyncStorage.setItem("@app_data_jogos", JSON.stringify(updated));

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? "Editar Jogo" : "Novo Jogo"}</Text>

      <TextInput
        placeholder="Título"
        value={game.title}
        onChangeText={(text) => setGame({ ...game, title: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Preço"
        value={game.price}
        onChangeText={(text) => setGame({ ...game, price: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="URL da Imagem"
        value={game.image}
        onChangeText={(text) => setGame({ ...game, image: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Data de Lançamento"
        value={game.release_date}
        onChangeText={(text) => setGame({ ...game, release_date: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Desenvolvedora"
        value={game.dev_game}
        onChangeText={(text) => setGame({ ...game, dev_game: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Informações do jogo"
        value={game.info_game}
        onChangeText={(text) => setGame({ ...game, info_game: text })}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonSave: {
    backgroundColor: "#00A8FF",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDelete: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
