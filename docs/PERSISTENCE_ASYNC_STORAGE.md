# Persistência de dados

Este guia descreve como adicionar persistência local ao `PrimeiroApp` usando `@react-native-async-storage/async-storage` (AsyncStorage). O objetivo é ensinar o que instalar, quais arquivos criar/alterar e exemplos de código ANTES/DEPOIS para os alunos aplicarem localmente.

IMPORTANTE: este é material didático — não aplique mudanças automaticamente no repositório principal sem confirmar.

---

## 1) O que instalar

- Se estiver usando Expo (recomendado):

```bash
expo install @react-native-async-storage/async-storage
```

- Se não estiver usando Expo (React Native CLI):

```bash
npm install @react-native-async-storage/async-storage
npx pod-install ios
```

## 2) Arquitetura recomendada

- Criar um helper central para leitura/gravação: `src/services/storage.ts`.
- Persistir apenas dados simples (JSON serializável) — por exemplo: última mensagem, perfil salvo, formulário do aluno.
- Fazer leitura no carregamento do app (ou nas telas relevantes) e gravar quando o usuário confirmar "Salvar".

## 3) Criar `src/services/storage.ts` (exemplo)

```ts
// INCLUIR: src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key: string, value: any) {
  try {
    const s = JSON.stringify(value);
    await AsyncStorage.setItem(key, s);
  } catch (e) {
    console.warn('saveItem error', e);
    throw e;
  }
}

export async function loadItem<T = any>(key: string): Promise<T | null> {
  try {
    const s = await AsyncStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : null;
  } catch (e) {
    console.warn('loadItem error', e);
    return null;
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('removeItem error', e);
  }
}
```

## 4) Exemplo prático (fluxo simples)

Contexto atual do `PrimeiroApp`: `HomeScreen` navega para `SecondScreen` passando `mensagem`. Abaixo está um exemplo de como permitir que o usuário salve essa mensagem em storage e como carregá-la.

### Modificar `src/screens/SecondScreen.tsx` — para com salvar/carregar dados

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { saveItem, loadItem } from '../services/storage'; // INCLUIR

type RootStackParamList = { Home: undefined; Second: { mensagem: string }; Third: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Second'>;

export default function SecondScreen({ navigation, route }: Props) {
  const [saved, setSaved] = useState<string | null>(null);
  const mensagem = route.params?.mensagem ?? '';

  useEffect(() => {
    (async () => {
      const s = await loadItem<string>('ultimaMensagem');
      if (s) setSaved(s);
    })();
  }, []);

  async function handleSave() {
    await saveItem('ultimaMensagem', mensagem);
    setSaved(mensagem);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
      <Text style={styles.message}>{mensagem}</Text>
      <Button title="Salvar mensagem" onPress={handleSave} />
      {saved ? <Text>Última salva: {saved}</Text> : null}
      <Button
        title="Vai para Terceira Tela"
        onPress={() => navigation.navigate('Third')}
      />
    </View>
  );
}
```

Observações:
- `loadItem('ultimaMensagem')` é chamado no `useEffect` para carregar o valor salvo quando a tela monta.
- `handleSave` grava a mensagem atual.

## 5) Alternativa: persistir globalmente no `App.tsx`

- Para casos onde você precisa que vários componentes acessem dados persistidos, carregue os dados em `App.tsx` (antes do `NavigationContainer`) e passe via props/context para as telas.
- Exemplo: carregar `await loadItem('perfil')` no `App.tsx` e preencher um `Context` ou estado que as telas consomem.

## 6) Testando

1. Instale a dependência (ver seção 1).
2. Copie `src/services/storage.ts` para o projeto.
3. Aplique as mudanças exemplificadas no `SecondScreen`.
4. Rode o app: `npx expo start` (ou `expo start`).
5. Navegue até `SecondScreen`, clique em "Salvar mensagem". Reinicie o app para confirmar que `loadItem` recupera o valor salvo.

## 7) Boas práticas e pontos importantes

- Guarde apenas pequenos pedaços de informação (JSON simples). Para arquivos/imagens use FileSystem ou upload remoto.
- Sempre envolva chamadas de storage em `try/catch` e trate erros (falha de I/O, JSON inválido).
- Considere usar um wrapper com expiração, versão de schema e migração de dados quando o app evoluir.
- Para dados sensíveis, não use AsyncStorage sem criptografia (considere soluções seguras ou backend).

---