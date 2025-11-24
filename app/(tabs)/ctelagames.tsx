import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGames } from '@/interfaces/IGames';

export default function ctelaModal() {

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [dev_game, setDev_game] = useState('');
  const [info_game, setInfo_game] = useState('');
  const [release_date, setRelease_date] = useState(''); 

  const handleAdd = async () => {
    try {
      if (!title.trim()) {
        Alert.alert('Atenção', 'Informe o nome do jogo.');
        return;
      }

      const saved = await AsyncStorage.getItem('@app_data_jogos');
      const jogos: IGames[] = saved ? JSON.parse(saved) : [];

      const newJogo: IGames = {
        id: jogos.length + 1,
        title,
        price,
        image,
        dev_game,
        info_game,
        release_date,
      };

      const updated = [...jogos, newJogo];
      await AsyncStorage.setItem('@app_data_jogos', JSON.stringify(updated));

      Alert.alert('Sucesso', 'Novo jogo adicionado!');

      setTitle('');
      setPrice('');
      setImage('');
      setRelease_date('');
      setDev_game('');
      setInfo_game('');
    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível salvar o jogo.');
    }
  };

  const onCancel = () => {
    setTitle('');
    setPrice('');
    setImage('');
    setRelease_date('');
    setDev_game('');
    setInfo_game('');
  }

  return (
      <SafeAreaView style={styles.container}  edges={["top", "left", "right"]}>
          <Header title="BuyGames" />
          <View style={styles.container}>
                  <View style={styles.boxContainer}>
                    <TextInput
                      style={styles.boxInput}
                      placeholder="Titulo do Jogo"
                      value={title}
                      onChangeText={setTitle}
                    />

                    <TextInput
                      style={styles.boxInput}
                      placeholder="Preço"
                      value={price}
                      onChangeText={setPrice}
                    />

                    <TextInput
                      style={styles.boxInput}
                      placeholder="Link da imagem"
                      value={image}
                      onChangeText={setImage}
                    />

                    <TextInput
                      style={styles.boxInput}
                      placeholder="Data de lançamento"
                      value={release_date}
                      onChangeText={setRelease_date}
                    />

                    <TextInput
                      style={styles.boxInput}
                      placeholder="Informações do jogo"
                      value={info_game}
                      onChangeText={setInfo_game}
                    />

                    <TextInput
                      style={styles.boxInput}
                      placeholder="Desenvolvedora"
                      value={dev_game}
                      onChangeText={setDev_game}
                    />
          
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                        <Text style={styles.buttonText}>{id > 0 ? 'Salvar' : 'Adicionar'}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
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
    flexDirection: 'row',
    marginTop: 180,
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
