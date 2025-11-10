import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface ModalScreenProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (title: string, price: string, image: string) => void;
}

export default function ModalScreen({ visible, onCancel, onAdd }: ModalScreenProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !price.trim()) {
      alert("Preencha o título e o preço!");
      return;
    }
    onAdd(title, price, image);
    setTitle("");
    setPrice("");
    setImage("");
  };

  if (Platform.OS === "web" && !visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Adicionar Jogo</Text>

          <TextInput
            style={styles.input}
            placeholder="Título do jogo"
            placeholderTextColor="#aaa"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="URL da imagem (opcional)"
            placeholderTextColor="#aaa"
            value={image}
            onChangeText={setImage}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAdd}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
  },
  cancelButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
