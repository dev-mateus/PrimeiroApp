# Passando dados via Input (nome) — Home → Second

Objetivo: enviar o valor de um `TextInput` da `HomeScreen` para a `SecondScreen` e exibir uma saudação personalizada `Olá, nome!`.

## 1) Conceito
Você pode capturar texto com um `TextInput` controlado por `useState` e enviar esse valor ao navegar:

```tsx
navigation.navigate('Second', { nome: valorDoInput });
```

Isso é apropriado quando o valor só precisa existir na tela de destino e não requer compartilhamento global.

## 2) Atualizar o tipo `RootStackParamList` em `App.tsx`
Declare que a `Second` aceita um parâmetro `nome`:

```tsx
// ANTES:
type RootStackParamList = {
  Home: undefined;
  Second: { mensagem: string };
};

// DEPOIS (agora Second aceita `nome`):
type RootStackParamList = {
  Home: undefined;
  Second: { nome?: string };
};
```

## 3) Modificar `HomeScreen.tsx` para ler o input e enviar o nome
Comentários explicitam linhas a deletar, modificar ou incluir.

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// MODIFICAR: tipo para enviar `nome` em vez de `mensagem`
type RootStackParamList = { Home: undefined; Second: { nome?: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  // INCLUIR: estado controlado para o input
  const [nome, setNome] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu nome</Text>
      {/* INCLUIR: TextInput controlado */}
      <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />
      {/* MODIFICAR: enviar `nome` via params */}
      <Button title="Ir para Second" onPress={() => navigation.navigate('Second', { nome })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 6 },
});
```

## 4) Modificar `SecondScreen.tsx` para receber e exibir o `nome`
Comentários explicitam linhas a deletar, modificar ou incluir.

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// MODIFICAR: aceitar `nome` em vez de `mensagem`
type RootStackParamList = { Home: undefined; Second: { nome?: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

export default function SecondScreen({ navigation, route }: Props) {
  // INCLUIR/MODIFICAR: ler o parâmetro `nome`
  const nome = route.params?.nome ?? '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
      {/* SUBSTITUIR: mostrar saudação usando `nome` */}
      <Text style={styles.message}>Olá{nome ? `, ${nome}` : ''}!</Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
  message: { fontSize: 16, marginBottom: 16, fontWeight: 'bold' },
});
```

## 5) Como funciona
1. O usuário digita um nome no `TextInput` da `HomeScreen`.
2. Ao navegar, a `HomeScreen` chama `navigation.navigate('Second', { nome })`.
3. O `react-navigation` entrega os params para a `SecondScreen` via `route.params`.
4. A `SecondScreen` lê `route.params?.nome` e exibe `Olá, nome!`.

## 6) Resumo do que foi feito
1. **Definiu parâmetros no tipo** — atualizou `RootStackParamList` para indicar que `Second` recebe `nome`.
2. **Leu input na Home** — adicionou `TextInput` controlado por `useState`.
3. **Enviou dados na HomeScreen** — usou `navigation.navigate('Second', { nome })`.
4. **Recebeu e exibiu na SecondScreen** — acessou `route.params?.nome` e exibiu saudação.

## 7) Conceitos importantes
- `route`: objeto do `react-navigation` que contém `params` passados pela navegação.
- Optional chaining (`?.`): evita erros se `params` for `undefined`.
- `TextInput` controlado: mantenha o valor em `useState` e atualize com `onChangeText`.

Resultado: agora sua `HomeScreen` pode enviar o nome digitado para a `SecondScreen`, que exibe uma saudação personalizada.