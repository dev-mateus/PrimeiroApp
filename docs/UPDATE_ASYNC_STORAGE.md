# Atualizar dados (AsyncStorage)

Este guia mostra como atualizar (update) dados já persistidos com `@react-native-async-storage/async-storage`, usando a `ThirdScreen` como exemplo de UI para editar e salvar alterações.

IMPORTANTE: material didático com blocos ANTES/DEPOIS — aplique localmente ou em um branch de exercício.

---

## Objetivo

- Permitir que o usuário edite um valor salvo (ex.: `ultimaMensagem`) na `ThirdScreen` e grave a versão atualizada no storage.
- Mostrar como atualizar um item dentro de uma lista (ex.: atualizar um `perfil` por `id`).

## Pré-requisitos

- Ter `src/services/storage.ts` com `saveItem`, `loadItem` e `removeItem` (ver `docs/PERSISTENCE_ASYNC_STORAGE.md`).
- Dependência instalada: `@react-native-async-storage/async-storage`.

---

## 1) Atualizar um valor simples — `ultimaMensagem`

### Contexto

No material anterior salvamos a chave `ultimaMensagem`. Agora vamos permitir editar essa mensagem na `ThirdScreen`.

### ANTES (`src/screens/ThirdScreen.tsx` atual)

```tsx
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
```

### DEPOIS — `ThirdScreen` com update

```tsx
// MODIFICAR: src/screens/ThirdScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { saveItem, loadItem } from '../services/storage'; // INCLUIR

type RootStackParamList = { Home: undefined; Second: undefined; Third: undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'Third'>;

export default function ThirdScreen({ navigation }: Props) {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      // carregamos o item correspondente ao id recebido via params
      // aguardamos o id enviado pela SecondScreen
      const id = (navigation as any).getState?.()?.routes?.find(r => r.name === 'Third')?.params?.id;
      // caso o app use uma lista sob 'mensagens', carregamos a lista e buscamos por id
      const msgs = (await loadItem<any[]>('mensagens')) || [];
      const found = msgs.find(m => m.id === id);
      if (found) setText(found.text);
    })();
  }, [navigation]);

  async function handleUpdate() {
    // salva a versão atualizada no storage
    await saveItem('ultimaMensagem', text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar última mensagem</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite a mensagem"
        style={styles.input}
      />
      <Button title="Salvar alteração" onPress={handleUpdate} />
      <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 18, marginBottom: 12 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12 },
});
```

### Notas

- O fluxo: `loadItem('ultimaMensagem')` carrega o valor atual, o usuário edita no `TextInput` e `saveItem` grava a versão atualizada.
- Após `handleUpdate`, outras telas que leem `ultimaMensagem` precisarão recarregar (ex.: via `useEffect`), ou usar Context para propagar imediatamente.

---

## 2) Atualizar um item dentro de uma lista — exemplo `perfis` (por `id`)

Se você armazena uma coleção de objetos em `perfis`, o update envolve: carregar a lista, mapear e substituir o item, salvar a lista inteira de volta.

### Helper: função de atualização (colocar em `src/services/storage.ts` ou `src/services/perfilService.ts`)

```ts
export async function updatePerfilById(id: string, changes: Partial<any>) {
  const perfis = (await loadItem<any[]>('perfis')) || [];
  const updated = perfis.map(p => (p.id === id ? { ...p, ...changes } : p));
  await saveItem('perfis', updated);
  return updated;
}
```

### UI (na `ThirdScreen` ou em uma tela de edição de perfil)

```tsx
// Exemplo resumido: editar nome do perfil na ThirdScreen
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { updatePerfilById, loadItem } from '../services/storage';

export default function ThirdScreen({ route }) {
  const id = route.params?.id; // id do perfil a editar
  const [nome, setNome] = useState('');

  useEffect(() => {
    (async () => {
      const perfis = await loadItem<any[]>('perfis');
      const p = perfis?.find(x => x.id === id);
      if (p) setNome(p.nome);
    })();
  }, [id]);

  async function handleSave() {
    await updatePerfilById(id, { nome });
  }

  return (
    <View>
      <Text>Editar perfil</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
```

### Observações

- Ao atualizar listas, sempre reescreva a lista completa para manter consistência do JSON.
- Considere otimizações (por exemplo, manter índices ou usar um banco local mais avançado) se a coleção crescer.

---

## 3) Propagação de mudanças na UI

- Padrões:
  - Recarregar com `useEffect` quando a tela monta.
  - Levantar estado para `App.tsx` ou usar `Context` para dados que muitas telas consomem.
  - Emitir eventos simples (EventEmitter) ou usar bibliotecas de estado global para sincronizar a UI.

## 4) Testes rápidos

1. Salve uma mensagem ou perfil.
2. Abra `ThirdScreen`, modifique o valor e clique em salvar.
3. Volte à tela que mostra os dados e confirme que o valor foi atualizado (ou recarregue a tela).

