# Adicionar uma tela e navegar entre as telas

Objetivo: criar uma segunda tela e navegar entre a tela existente e a nova usando `react-navigation`. Cada tela terá um botão para ir à outra.

## 1) Instalar dependências
Execute no terminal do projeto:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

## 2) Criar as telas
Crie a pasta `src/screens` e os arquivos abaixo:
- `src/screens/HomeScreen.tsx` (tela inicial)
- `src/screens/SecondScreen.tsx` (segunda tela)

### `src/screens/HomeScreen.tsx`

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Second: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <Button
        title="Ir para Segunda Tela"
        onPress={() => navigation.navigate('Second')}
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

### `src/screens/SecondScreen.tsx`

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = { Home: undefined; Second: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

export default function SecondScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
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
```

## 3) Atualizar `App.tsx` para usar a navegação
Edite o arquivo `App.tsx` seguindo os comentários:

```tsx
// REMOVER ou comentar estas linhas:
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// ADICIONAR estes imports:
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';

// ADICIONAR este tipo (define as rotas do app):
type RootStackParamList = {
  Home: undefined;
  Second: undefined;
};

// ADICIONAR esta linha:
const Stack = createNativeStackNavigator<RootStackParamList>();

// MANTER a função App, mas SUBSTITUIR o conteúdo do return:
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Second" component={SecondScreen} options={{ title: 'Segunda' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// REMOVER o StyleSheet.create que estava no final (não é mais necessário)
```

## 4) Como navegar entre as telas
- Na tela inicial, o botão usa `navigation.navigate('Second')`.
- Na segunda tela, o botão usa `navigation.navigate('Home')`.

Pronto: agora você tem duas telas e navegação bidirecional com botões.

## Resumo do que foi feito
1. **Instalou dependências** de navegação (`@react-navigation/native`, `@react-navigation/native-stack`) e compatibilidade nativa.
2. **Criou dois componentes de tela** (HomeScreen e SecondScreen) que recebem o objeto `navigation` via props para permitir navegação entre elas.
3. **Configurou o navegador** (NavigationContainer + Stack.Navigator) no App.tsx, definindo as rotas e qual tela é inicial.
4. **Adicionou botões** em cada tela que chamam `navigation.navigate()` para trocar entre telas.

## Conceitos importantes
### O que é `props`?
`props` (abreviação de "properties") são dados que passamos de um componente pai para um componente filho. No caso das telas, o `react-navigation` injeta automaticamente o objeto `navigation` como uma prop. Você acessa assim:

```tsx
export default function HomeScreen({ navigation }: Props) {
  // navigation é recebido como prop
}
```

### O que é o objeto `navigation`?
É um objeto fornecido pelo `react-navigation` que contém métodos para navegar entre telas:
- `navigation.navigate('ScreenName')` — vai para a tela especificada.
- `navigation.goBack()` — volta para a tela anterior.
- `navigation.push('ScreenName')` — empilha a tela (diferente de `navigate`).

No exemplo, usamos `navigation.navigate('Second')` e `navigation.navigate('Home')` para trocar entre telas.