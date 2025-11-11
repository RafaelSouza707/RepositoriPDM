import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { IDevs } from '@/interfaces/IDevs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


export default function ctelaModal() {
  const [nome, setNome] = useState('');
  const [date_fundacao, setDate_fundacao] = useState('');
  const [jogos_desenvolvidos, setJogos_desenvolvidos] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState<number>(0);
  const [devs, setDevs] = useState<IDevs[]>([]); 
  const [location, setLocation] = useState<Location.LocationObject | null> (null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect( () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if ( status !== 'granted') {
        setErrorMsg('Permissao para o acesso a localização foi negado.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Esperando...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleAdd = async() => {
    try {
      if (!nome.trim()) {
        Alert.alert('Atenção', 'Informe o nome da desenvolvedora.');
        return;
      }

      const saved = await AsyncStorage.getItem('@app_data_devs');
      const currentDevs: IDevs[] = saved ? JSON.parse(saved) : [];
      
      const newId = currentDevs.length > 0 ? Math.max(...currentDevs.map(d => d.id)) + 1 : 1;
      

      const newDev: IDevs = {
        id: newId, 
        nome,
        date_fundacao,
        jogos_desenvolvidos,
        image,
      };
      
      const updated = [...currentDevs, newDev];
      
      await AsyncStorage.setItem('@app_data_devs', JSON.stringify(updated));

      Alert.alert('Sucesso', 'Nova desenvolvedora adicionada!');

      setNome('');
      setDate_fundacao('');
      setJogos_desenvolvidos('');
      setImage('');
    } catch (error) {
      console.error('Erro ao salvar dev:', error);
      Alert.alert('Erro', 'Não foi possivel salvar a desenvolvedora.');
    }
  };

    const onAdd = (
      nome: string,
      date_fundacao: string,
      jogos_desenvolvidos: string,
      image: string,
      id?: number
    ) => {
    };

  return (
      <SafeAreaView style={styles.container}  edges={["top", "left", "right"]}>
        <Header title="BuyGames"/> 
        <Text>{text}</Text>
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
                      value={date_fundacao}
                      onChangeText={setDate_fundacao}
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
                        <Text style={styles.buttonText}>Adicionar</Text>
                      </TouchableOpacity>
                    </View>
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