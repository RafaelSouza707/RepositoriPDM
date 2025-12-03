import { IUser } from '@/interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UsersDetailsScreen() {
  const { id } = useLocalSearchParams();
  const isEditing = Boolean(id);

  const [user, setUser] = useState<IUser>({
    id: 0,
    nome: "",
    email: "",
    imagem: "",    
  });

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!isEditing) {
      setUser({
        id: 0,
        nome: "",
        email: "",
        imagem: "",
      });
    } else {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    const json = await AsyncStorage.getItem('@app_data_users');
    const storedUsers: IUser[] = json ? JSON.parse(json) : [];
    setUsers(storedUsers);

    if (isEditing) {
      const selected = storedUsers.find(item => item.id.toString() === id);
      if (selected) setUser(selected);
    }
  };

  const handleSave = async () => {
    if (!user.nome || !user.email || !user.imagem) {
      Alert.alert("Erro", "Preencha nome, email e imagem!");
      return;
    }

    try {
      const saved = await AsyncStorage.getItem("@app_data_users");
      const lista: IUser[] = saved ? JSON.parse(saved) : [];

      let updatedList: IUser[] = [];

      if (isEditing) {
        updatedList = lista.map(item =>
          item.id === user.id ? user : item
        );
      } else {
        const newId = lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
        updatedList = [...lista, { ...user, id: newId }];
      }

      await AsyncStorage.setItem("@app_data_users", JSON.stringify(updatedList));
      router.back();
    } catch (e) {
      console.error("Erro ao salvar usuario:", e);
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;

    const updated = users.filter(item => item.id !== user.id);

    await AsyncStorage.setItem("@app_data_users", JSON.stringify(updated));

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? "Editar Usuario" : "Novo Usuario"}</Text>

      <TextInput
        placeholder="Nome"
        value={user.nome}
        onChangeText={(text) => setUser({ ...user, nome: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="URL da Imagem"
        value={user.imagem}
        onChangeText={(text) => setUser({ ...user, imagem: text })}
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
