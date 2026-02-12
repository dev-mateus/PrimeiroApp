# Deletar dados (AsyncStorage)

Este guia mostra como **deletar** dados persistidos com `@react-native-async-storage/async-storage` no contexto do `PrimeiroApp`. Inclui exemplos ANTES/DEPOIS para que alunos apliquem localmente.

IMPORTANTE: este é material didático — copie os trechos para experimentar em um branch ou no `PerfilApp` dos alunos; não aplique mudanças no repositório base sem confirmar.

---

## Pré-requisitos

- Ter o helper `src/services/storage.ts` com `saveItem`, `loadItem` e `removeItem` (veja `docs/PERSISTENCE_ASYNC_STORAGE.md`).
- Dependência instalada: `@react-native-async-storage/async-storage`.

## Objetivos deste passo a passo

- Deletar um item específico salvo (ex.: chave `ultimaMensagem`).
- Deletar/limpar todos os dados (opção de reset).
- Remover um item de uma lista (ex.: remover um perfil específico de uma lista de perfis).

---

## 1) Deletar um item específico — usar `removeItem`

ANTES (sem delete):

```tsx
// src/screens/SecondScreen.tsx (trecho simplificado)
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SecondScreen({ route }) {
  return (
    <View>
      <Text>{route.params?.mensagem}</Text>
    </View>
  );
}
```

DEPOIS (adicionar botão de deletar usando `removeItem` do helper):

```tsx
// MODIFICAR: src/screens/SecondScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { saveItem, loadItem, removeItem } from '../services/storage'; // INCLUIR

export default function SecondScreen({ route }) {
  const [saved, setSaved] = useState<string | null>(null);
  const mensagem = route.params?.mensagem ?? '';

  useEffect(() => {
    (async () => {
      const s = await loadItem<string>('ultimaMensagem');
      setSaved(s);
    })();
  }, []);

  async function handleDelete() {
    await removeItem('ultimaMensagem');
    setSaved(null);
  }

  return (
    <View>
      <Text>{mensagem}</Text>
      <Button title="Salvar mensagem" onPress={async () => { await saveItem('ultimaMensagem', mensagem); setSaved(mensagem); }} />
      <Button title="Deletar mensagem salva" onPress={handleDelete} />
      {saved ? <Text>Última salva: {saved}</Text> : <Text>Nenhuma mensagem salva</Text>}
    </View>
  );
}
```

Teste: salve uma mensagem, recarregue a tela e pressione "Deletar mensagem salva"; o texto salvo deve sumir e `loadItem` deve retornar `null`.

---

## 2) Limpar todo o storage — `AsyncStorage.clear()` (use com cuidado)

Às vezes é útil ter um botão de "reset" que apague todos os dados locais. Isso é arriscado em produção — use só em desenvolvimento ou com confirmação do usuário.

Exemplo (usar diretamente `AsyncStorage`):

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.warn('clearAll error', e);
  }
}
```

OU: criar helper `clearAll()` em `src/services/storage.ts` que chama `AsyncStorage.clear()`.

---

## 3) Remover um item dentro de uma lista (ex.: lista de perfis)

Se você armazena uma lista (array) sob uma chave — por exemplo `perfis` = [{ id, nome, ... }, ...] — para remover um perfil:

ANTES: salvar e carregar a lista sem remoção

```ts
// salvar lista completa
await saveItem('perfis', novosPerfis);
```

DEPOIS: função para remover um perfil por id

```ts
async function removePerfilById(id: string) {
  const perfis = await loadItem<Array<any>>('perfis') || [];
  const filtrado = perfis.filter(p => p.id !== id);
  await saveItem('perfis', filtrado);
}
```

Observação: atualizar o estado da UI local (por exemplo `useState`) após salvar para refletir a remoção.

---

## 4) Confirmação e UX

- Sempre confirme com o usuário antes de deletar tudo (`Alert.alert` com ações). Exemplo:

```tsx
import { Alert } from 'react-native';

Alert.alert('Confirmar', 'Deseja apagar todos os dados locais?', [
  { text: 'Cancelar', style: 'cancel' },
  { text: 'Apagar', style: 'destructive', onPress: () => clearAll() },
]);
```

---

## 5) Testes e verificação

1. Salve um item (`saveItem`).
2. Certifique-se que `loadItem` retorna o valor salvo.
3. Use `removeItem` para deletar a chave e verifique que `loadItem` agora retorna `null`.
4. Teste `removePerfilById` removendo um id e verifique a lista atualizada.
5. Teste `clearAll` com confirmação e verifique que todas as chaves foram removidas.

---

## 6) Boas práticas

- Não limpe todo o storage sem confirmação do usuário.
- Para grandes coleções ou arquivos, prefira FileSystem ou backend.
- Se os dados são críticos, considere backups ou sincronização remota antes de deletar localmente. 
