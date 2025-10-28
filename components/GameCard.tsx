import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export type GameCardProps = { 
  title: string; 
  price: string; 
  image: string 
};

export default function GameCard({ title, price, image }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
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