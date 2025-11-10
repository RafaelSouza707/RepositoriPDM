import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Header from "../../components/Header";
import { IDevs } from '@/interfaces/IDevs';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ctelaModal() {
  const [nome, setNome] = useState('');
  const [data_fundacao, setData_fundacao] = useState('');
  const [jogos_desenvolvidos, setJogos_desenvolvidos] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState<number>(0);

  const handleAdd = async() => {
    try {
      if (!nome.trim()) {
        Alert.alert('Atenção', 'Informe o nome da desenvolvedora.');
        return;
      }

      const saved = await AsyncStorage.getItem('@app_data_devs');
      const devs: IDevs[] = saved ? JSON.parse(saved) : [];

      const newDev: IDevs = {
        id: devs.length + 1,
        nome,
        data_fundacao,
        jogos_desenvolvidos,
        image,
      };

      const updated = [...devs, newDev];
      await AsyncStorage.setItem('@app_data_devs', JSON.stringify(updated));

      Alert.alert('Sucesso', 'Nova desenvolvedora adicionada!');

      setNome('');
      setData_fundacao('');
      setJogos_desenvolvidos('');
      setImage('');
    } catch (error) {
      console.error('Erro ao salvar dev:', error);
      Alert.alert('Erro', 'Não foi possivel salvar a desenvolvedora.');
    }
  };

    const onAdd = (
      nome: string,
      data_fundacao: string,
      jogos_desenvolvidos: string,
      image: string,
      id?: number
    ) => {
      if (!id || id <= 0) {
        const newDev: IDevs = {
          id: devs.length + 1,
          nome,
          data_fundacao,
          jogos_desenvolvidos,
          image,
        };
        const updateDevs = [...devs, newDev];
        setDevs(updateDevs);
        saveDev(newDev);
      } else {
        const updated = devs.map((dev) =>
          dev.id === id
            ? { ...dev, nome, data_fundacao, jogos_desenvolvidos, image }
            : dev
        );
        setDevs(updated);
      }
    };

  const onCancel = () => {
  }

  const onDelete = () => {
  }

  return (
      <SafeAreaView style={styles.container}  edges={["top", "left", "right"]}>
        <Header title="BuyGames"/>  
          <View style={styles.container}>
                  <View style={styles.boxContainer}>
                    <TextInput
                      style={styles.boxInput}
                      placeholder="Nome da desenvolvedora"
                      value={nome}
                      onChangeText={setNome}
                      autoFocus
                    />
          
                    <TextInput
                      style={styles.boxInput}
                      placeholder="Data de fundação"
                      value={data_fundacao}
                      onChangeText={setData_fundacao}
                    />
          
                    <TextInput
                      style={styles.boxInput}
                      placeholder="Jogos feitos por essa desenvolvedora"
                      value={jogos_desenvolvidos}
                      onChangeText={setJogos_desenvolvidos}
                    />
          
                    <TextInput
                      style={styles.boxInput}
                      placeholder="Link Imagem"
                      value={image}
                      onChangeText={setImage}
                    />
          
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                        <Text style={styles.buttonText}>{id > 0 ? 'Salvar' : 'Adicionar'}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
          
                    {id > 0 && (
                      <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)}>
                        <Text style={styles.buttonText}>Excluir</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    borderColor: '#ffffffff',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonAdd: {
    backgroundColor: 'green',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 15,
  },
  buttonCancel: {
    backgroundColor: 'gray',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 180,
    flexDirection: 'row',
    height: 60,
  },
  boxInput: {
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#DDD',
    margin: 5,
    paddingHorizontal: 10,
  },
  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    alignSelf: 'stretch',
  },
});
