# Adicionar uma tela e navegar entre as telas

Objetivo: criar uma segunda tela e navegar entre a tela existente e a nova usando `react-navigation`. Cada tela terá um botão para ir à outra.

## 1) Instalar dependências
Execute no terminal do projeto:

```bash
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
});
```

## 3) Atualizar `App.tsx` para usar a navegação
Substitua o conteúdo de `App.tsx` por este (ou adapte ao seu projeto):

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';

type RootStackParamList = {
  Home: undefined;
  Second: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
```

## 4) Como navegar entre as telas
- Na tela inicial, o botão usa `navigation.navigate('Second')`.
- Na segunda tela, o botão usa `navigation.navigate('Home')`.

Pronto: agora você tem duas telas e navegação bidirecional com botões.