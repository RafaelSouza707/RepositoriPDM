import { IUser } from '@/interfaces/IUser';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UserCardProps {
  user: IUser;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function UserCard({ user, onPress, onDelete }: UserCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: user.imagem }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#333',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#ccc',
    fontSize: 14,
  },
  deleteButton: {
    padding: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
