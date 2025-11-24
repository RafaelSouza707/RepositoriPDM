import CardDev from '@/components/CardDev';
import ModalScreen from '@/components/modal-dev';
import { ThemedView } from '@/components/themed-view';
import { IDevs } from '@/interfaces/IDevs';
import { dataDevs } from '@/src/data/devs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../../components/Header";


export default function DevScreen() {
  const [devs, setDevs] = useState<IDevs[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDev, setSelectedDev] = useState<IDevs | undefined>(undefined);

  useEffect(() => {
    loadDevs();
  }, []);

  const saveDevList = async (list:IDevs[]) => {
    try {
      await AsyncStorage.setItem('@app_data_devs', JSON.stringify(list));
      console.log('Lista de devs salva!')
    } catch (error) {
      console.error('Error ao salvar lista', error);
    }
  }

  const loadDevs = async () => {
    try {
      const saved = await AsyncStorage.getItem('@app_data_devs');

      if (saved) {
        setDevs(JSON.parse(saved));
        console.log('Dados carregados do AsyncStorage');

      } else {
        await AsyncStorage.setItem('@app_data_devs', JSON.stringify(dataDevs));
        setDevs(dataDevs);
        console.log('Dados salvos no AsyncStorage');

      }
    } catch (error) {
      console.error('Erro ao carregar dados iniciais: ', error);
    }
  };
/*
  const saveDev = async (novoDev: IDevs) => {
    try {
      const jsonDev = await AsyncStorage.getItem('@app_data_devs');
      const listaDevs = jsonDev ? JSON.parse(jsonDev) : [];
      listaDevs.push(novoDev);
      await AsyncStorage.setItem('@app_data_devs', JSON.stringify(listaDevs));

    } catch (error) {
      console.error('Erro ao salvar: ', error);
    }
  } 
*/
  const onAdd = (

    nome: string,
    date_fundacao: string,
    jogos_desenvolvidos: string,
    image: string,
    id?: number

  ) => {
    let listToSave: IDevs[];

    if (!id || id <= 0) {
      const newDev: IDevs = {
        id: devs.length + 1,
        nome,
        date_fundacao,
        jogos_desenvolvidos,
        image,
      };

      listToSave = [...devs, newDev];
      
      /*
      const updateDevs = [...devs, newDev];
      setDevs(updateDevs);
      saveDev(newDev);
      setModalVisible(false);
      */
      
    } else {
      listToSave = devs.map((dev) =>
        dev.id === id
          ? { ...dev, nome, date_fundacao, jogos_desenvolvidos, image }
          : dev
      );

    }
    setDevs(listToSave);

    saveDevList(listToSave);
    
    setModalVisible(false);
    setSelectedDev(undefined);
  };

  const onDelete = (id: number) => {
    const filtered = devs.filter((dev) => dev.id !== id);
    setDevs(filtered);
    
    saveDevList(filtered)

    setModalVisible(false);
    setSelectedDev(undefined);
  };

  const openModal = () => {
    setSelectedDev(undefined);
    setModalVisible(true);
  };

  const openEditModal = (dev: IDevs) => {
    setSelectedDev(dev);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDev(undefined);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Header title="BuyGames" />

      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={devs}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CardDev
            key={item.id}
            nome={item.nome}
            data_fundacao={item.date_fundacao}
            jogos_desenvolvidos={item.jogos_desenvolvidos}
            image={item.image}
            onPress={() => openEditModal(item)}
          />
        )}
      />


      <ModalScreen
        visible={modalVisible}
        onCancel={closeModal}
        onAdd={onAdd}
        onDelete={onDelete}
        dev={selectedDev}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    backgroundColor: '#ecd503ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    color: '#0400ffff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  listContent: {
    padding: 16,
  },
});
