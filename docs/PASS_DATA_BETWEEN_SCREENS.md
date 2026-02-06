# Passando dados entre telas

Objetivo: enviar dados de uma tela para outra usando `navigate()` com parâmetros e receber esses dados na tela de destino.

## 1) Conceito
Quando você navega de uma tela para outra, pode enviar informações junto. Por exemplo:
- Clicar em um item na HomeScreen e mostrar seus detalhes na SecondScreen
- Passar o nome do usuário de uma tela para outra

Sintaxe básica:
```tsx
navigation.navigate('ScreenName', { chave: valor });
```

## 2) Atualizar o tipo `RootStackParamList` em `App.tsx`
O tipo `RootStackParamList` define quais parâmetros cada tela pode receber. Modifique conforme abaixo:

```tsx
// ANTES:
type RootStackParamList = {
  Home: undefined;
  Second: undefined;
};

// DEPOIS (agora SecondScreen aceita um parâmetro):
type RootStackParamList = {
  Home: undefined;
  Second: { mensagem: string }; // Adicionar: SecondScreen agora recebe um parâmetro 'mensagem'
};
```

## 3) Modificar `HomeScreen.tsx` para enviar dados
Atualize o botão para passar um parâmetro ao navegar:

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Second: { mensagem: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <Button
        title="Ir para Segunda Tela"
        onPress={() => navigation.navigate('Second', { mensagem: 'Olá da tela inicial!' })} // Modificar: enviar parâmetro
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
```

## 4) Modificar `SecondScreen.tsx` para receber e exibir dados
Atualize para receber e usar o parâmetro:

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Second: { mensagem: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

export default function SecondScreen({ navigation, route }: Props) { // Modificar: adicionar 'route'
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
      <Text style={styles.message}>{route.params?.mensagem}</Text> {/* Adicionar: exibir o parâmetro recebido */}
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
  message: { // Adicionar: novo estilo para a mensagem
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
});
```

## 5) Como funciona
1. Na HomeScreen, o botão chama `navigation.navigate('Second', { mensagem: 'Olá da tela inicial!' })`
2. O `react-navigation` navega para a SecondScreen e passa o objeto `{ mensagem: 'Olá da tela inicial!' }`
3. Na SecondScreen, acessamos esse dado via `route.params?.mensagem`
4. A tela exibe a mensagem recebida

## Resumo do que foi feito
1. **Definiu parâmetros no tipo** — atualizou `RootStackParamList` para indicar que SecondScreen recebe um parâmetro `mensagem`.
2. **Enviou dados na HomeScreen** — modificou `navigation.navigate()` para passar `{ mensagem: 'Olá da tela inicial!' }`.
3. **Recebeu e exibiu na SecondScreen** — adicionou o objeto `route` (que contém `params`) e exibiu o dado com `route.params?.mensagem`.
4. **Adicionou estilo** — criou um estilo para a mensagem exibida.

## Conceitos importantes
### O que é `route`?
`route` é outro objeto injetado pelo `react-navigation` que contém informações sobre a tela atual, incluindo os **parâmetros** passados via `navigate()`.

### O operador `?.` (optional chaining)
`route.params?.mensagem` significa: "acesse `route.params.mensagem`, mas se `params` for `undefined` ou `null`, retorne `undefined` em vez de gerar erro".

Resultado: agora suas telas podem se comunicar passando dados!
