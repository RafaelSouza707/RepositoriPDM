import { IDevs } from '@/interfaces/IDevs';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type DevModalProps = {
  visible: boolean;
  onAdd: (nome: string, data_fundacao: string, jogos_desenvolvidos: string, image: string, id?: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  dev?: IDevs;
};

export default function ModalScreen({ visible, onAdd, onCancel, onDelete, dev }: DevModalProps) {
  const [nome, setNome] = useState('');
  const [data_fundacao, setData_fundacao] = useState('');
  const [jogos_desenvolvidos, setJogos_desenvolvidos] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (dev) {
      setNome(dev.nome ?? '');
      setData_fundacao(dev.date_fundacao ?? '');
      setJogos_desenvolvidos(dev.jogos_desenvolvidos ?? '');
      setImage(dev.image ?? '');
      setId(dev.id ?? 0);
    } else {
      setNome('');
      setData_fundacao('');
      setJogos_desenvolvidos('');
      setImage('');
      setId(0);
    }
  }, [dev]);

  const handleAdd = () => {
    onAdd(nome, data_fundacao, jogos_desenvolvidos, image, id);
    setNome('');
    setData_fundacao('');
    setJogos_desenvolvidos('');
    setImage('');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxContainer: {
    backgroundColor: '#FFF',
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
    marginTop: 10,
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
