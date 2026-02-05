import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Second: undefined; Third: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Third'>;

export default function ThirdScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terceira Tela</Text>
      <Button
        title="Voltar para Tela Inicial"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});