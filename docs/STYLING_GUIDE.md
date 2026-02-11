# Guia de Estilização

Este guia mostra como introduzir um tema centralizado e aplicar estilos nas telas do `PrimeiroApp`.
IMPORTANTE: este arquivo é apenas um material didático com blocos `ANTES` / `DEPOIS` — não aplique as mudanças automaticamente usem estes trechos para modificar seu PrimeiroApp.

---

## Arquivo novo: `src/styles/theme.ts`

criar `src/styles/theme.ts` com o conteúdo abaixo

```ts
import { Platform } from 'react-native';

const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#0A84FF',
    card: '#F2F5F9',
    text: '#111827',
    muted: '#6B7280',
    danger: '#EF4444',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
  radius: { sm: 6, md: 10, lg: 16 },
  fontSizes: { sm: 12, md: 16, lg: 20 },
  platform: Platform.OS,
};

export default theme;
```

---

## Tela: `src/screens/HomeScreen.tsx`
MODIFICAR: src/screens/HomeScreen.tsx

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import theme from '../styles/theme'; // INCLUIR

type RootStackParamList = { Home: undefined; Second: { mensagem: string } };
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <Button
        title="Ir para Segunda Tela"
        onPress={() => navigation.navigate('Second', { mensagem: 'Olá da tela inicial!' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background, // MODIFICAR
    padding: theme.spacing.md, // INCLUIR
  },
  title: {
    fontSize: theme.fontSizes.lg, // MODIFICAR
    marginBottom: theme.spacing.md, // MODIFICAR
    color: theme.colors.primary, // INCLUIR
    fontWeight: '600', // INCLUIR
  },
});
```

---

## Tela: `src/screens/SecondScreen.tsx`
MODIFICAR: src/screens/SecondScreen.tsx

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import theme from '../styles/theme'; // INCLUIR

type RootStackParamList = { Home: undefined; Second: { mensagem: string }; Third: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

export default function SecondScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
      <Text style={styles.message}>{route.params?.mensagem}</Text>
      <Button
        title="Vai para Terceira Tela"
        onPress={() => navigation.navigate('Third')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card, // MODIFICAR
    padding: theme.spacing.lg, // INCLUIR
  },
  title: {
    fontSize: theme.fontSizes.lg, // MODIFICAR
    marginBottom: theme.spacing.md, // MODIFICAR
    color: theme.colors.primary, // INCLUIR
    fontWeight: '600',
  },
  message: {
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.md,
    fontWeight: '700',
    color: theme.colors.text, // INCLUIR
  },
});
```

---

## Tela: `src/screens/ThirdScreen.tsx`
MODIFICAR: src/screens/ThirdScreen.tsx

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import theme from '../styles/theme'; // INCLUIR

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
    backgroundColor: theme.colors.background, // MODIFICAR
    padding: theme.spacing.md, // INCLUIR
  },
  title: {
    fontSize: theme.fontSizes.lg, // MODIFICAR
    marginBottom: theme.spacing.md, // MODIFICAR
    color: theme.colors.primary, // INCLUIR
    fontWeight: '600',
  },
});
```