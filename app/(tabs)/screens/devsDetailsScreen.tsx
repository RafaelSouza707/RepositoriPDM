import { IDevs } from '@/interfaces/IDevs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DevDetailsScreen() {
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);

  const [dev, setDev] = useState<IDevs>({
    id: 0,
    nome: "",
    date_fundacao: "",
    jogos_desenvolvidos: "",
    image: "",
  });

  const [devs, setDevs] = useState<IDevs[]>([]);

  useEffect(() => {
    loadDev();
  }, [id]);

  const loadDev = async () => {
    const json = await AsyncStorage.getItem('@app_data_devs');
    const storedDevs: IDevs[] = json ? JSON.parse(json) : [];
    setDevs(storedDevs);

    if (isEditing) {
      const selected = storedDevs.find(item => item.id.toString() === id);
      if (selected) setDev(selected);
    }
  };

  const handleSave = async () => {
    let updatedList: IDevs[] = [];

    if (isEditing) {
      updatedList = devs.map(item => item.id === dev.id ? dev : item);
    } else {
      const novoDev: IDevs = {
        ...dev,
        id: devs.length > 0 ? devs[devs.length - 1].id + 1 : 1
      };
      updatedList = [...devs, novoDev];
    }

    await AsyncStorage.setItem('@app_data_devs', JSON.stringify(updatedList));
    router.back();
  };

  const onDelete = async () => {
    if (!isEditing) return;

    const updated = devs.filter(item => item.id !== dev.id);

    await AsyncStorage.setItem('@app_data_devs', JSON.stringify(updated));

    router.back();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{isEditing ? "Editar Dev" : "Novo Dev"}</Text>

      <TextInput
        placeholder="Nome"
        value={dev.nome}
        onChangeText={(text) => setDev({ ...dev, nome: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Data de fundação"
        value={dev.date_fundacao}
        onChangeText={(text) => setDev({ ...dev, date_fundacao: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Jogos desenvolvidos"
        value={dev.jogos_desenvolvidos}
        onChangeText={(text) => setDev({ ...dev, jogos_desenvolvidos: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="URL da imagem"
        value={dev.image}
        onChangeText={(text) => setDev({ ...dev, image: text })}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
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
