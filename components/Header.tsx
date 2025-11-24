import React from "react";
import { View, Text, StyleSheet } from "react-native";

type HeaderProps = { title: string };

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: "100%", 
    paddingVertical: 20, 
    paddingHorizontal: 16, 
    backgroundColor: "#1f1f1f", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#333" 
  },
  title: { 
    color: "#ff0000ff", 
    fontSize: 24, 
    fontWeight: "bold" 
  },
});
