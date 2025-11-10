import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Header from '@/components/Header';






export default function ctelaModal() {

      const [nome, setNome] = useState('');
      const [data_fundacao, setData_fundacao] = useState('');
      const [jogos_desenvolvidos, setJogos_desenvolvidos] = useState('');
      const [image, setImage] = useState('');
      const [id, setId] = useState<number>(0);

    const handleAdd = () => {

    }

    const onCancel = () => {

    }

    const onDelete = () => {

    }

    return (
        <SafeAreaView style={styles.container}  edges={["top", "left", "right"]}>
            <Header title="BuyGames" />
            <View style={styles.container}>
                    <View style={styles.boxContainer}>
                      <TextInput
                        style={styles.boxInput}
                        placeholder="Titulo do Jogo"
                        value={nome}
                        onChangeText={setNome}
                        autoFocus
                      />
            
                      <TextInput
                        style={styles.boxInput}
                        placeholder="Preço"
                        value={data_fundacao}
                        onChangeText={setData_fundacao}
                      />
            
                      <TextInput
                        style={styles.boxInput}
                        placeholder="Link da imagem"
                        value={jogos_desenvolvidos}
                        onChangeText={setJogos_desenvolvidos}
                      />
            
                      <TextInput
                        style={styles.boxInput}
                        placeholder="Data de lançamento"
                        value={image}
                        onChangeText={setImage}
                      />

                      <TextInput
                        style={styles.boxInput}
                        placeholder="Devensolvedora"
                        value={image}
                        onChangeText={setImage}
                      />

                      <TextInput
                        style={styles.boxInput}
                        placeholder="Informações sobre o jogo"
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
