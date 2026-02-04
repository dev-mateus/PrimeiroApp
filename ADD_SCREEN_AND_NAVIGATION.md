# Adicionar uma tela e navegar entre as telas

Este passo a passo mostra como adicionar uma segunda tela ao projeto e navegar entre a tela existente e a nova usando `react-navigation`. Em cada tela criaremos um botão que leva à outra.

## 1 — Instalar dependências
No terminal do projeto execute:

```bash
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```

> Observação: usando Expo Managed, `expo install` garante compatibilidade para dependências nativas.

## 2 — Criar a estrutura de arquivos
Crie a pasta `src/screens` e os dois arquivos de tela:
- `src/screens/HomeScreen.tsx` (tela existente equivalência)
- `src/screens/SecondScreen.tsx` (nova tela)

## 3 — Código das telas
Crie `src/screens/HomeScreen.tsx` com o seguinte conteúdo:

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

Crie `src/screens/SecondScreen.tsx` com o seguinte conteúdo:

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

## 4 — Atualizar `App.tsx` para usar a navegação
Substitua o conteúdo de `App.tsx` por este (ou integre seguindo o exemplo):

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

## 5 — Notas rápidas
- Os botões usam `navigation.navigate('ScreenName')` para trocar telas.
- Em TypeScript usamos `NativeStackScreenProps` e um `RootStackParamList` para tipar `navigation` e evitar `any`.
- Caso use `react-navigation` em um projeto já em produção, confira documentação oficial para configurações adicionais (gesto, animações, deep links, etc.).

---
Arquivo criado para uso dos alunos; se quiser, eu crio automaticamente os arquivos `src/screens/*` e atualizo `App.tsx` para você.