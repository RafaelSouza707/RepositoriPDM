import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type GameCardProps = { 
  title: string; 
  price: string; 
  image: string;
  onPress?: () => void;
};

export default function GameCard({ title, price, image, onPress }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>R$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20
  },
  image: { 
    width: "100%",
    height: 200
  },
  info: {
    padding: 15
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  price: {
    color: "#00FF88",
    marginTop: 4
  },
});