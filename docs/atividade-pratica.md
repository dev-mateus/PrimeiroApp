# Atividade Prática — PerfilApp

## Objetivo

Criar um projeto separado que demonstre navegação e passagem de dados entre telas. O aluno deve implementar o app localmente em um novo repositório e publicá-lo no GitHub.

## Requisitos mínimos

- Criar um novo repositório local (nome sugerido: `PerfilApp`) e publicar no GitHub.
- O app deve ter exatamente 2 telas: `FormScreen` e `PreviewScreen`.
- Implementar navegação com `@react-navigation/native` e `@react-navigation/native-stack`.
- `FormScreen` deve conter 3 campos: `nome`, `email`, `bio` (TextInput) e um botão `Preview`.
- Ao clicar em `Preview`, navegar para `PreviewScreen` passando os dados via `navigation.navigate('Preview', { nome, email, bio })`.
- `PreviewScreen` deve receber os dados via `route.params` e exibir em um cartão estilizado, além de ter um botão que volta para `FormScreen` (ou para `Home`).
- Implementar validação mínima: `nome` e `email` obrigatórios; email com regex simples; impedir navegação se inválido e mostrar mensagem de erro inline.
- Implementar tema: aplicar um tema (cores, espaçamento, tipografia)
- Implementar botão `Salvar localmente` que persiste os dados em `AsyncStorage`.

## Sugestão de comandos iniciais

Use o template `defaultexpo-template-blank-typescript` e crie o projeto com o comando abaixo:

```bash
npx create-expo-app@latest PerfilApp --template expo-template-blank-typescript
```

## Estrutura sugerida

- `App.tsx` — configura o `NavigationContainer` e o `Stack.Navigator` com as rotas `Form` e `Preview`.
- `src/screens/FormScreen.tsx` — formulário, validação e `navigation.navigate('Preview', { ... })`.
- `src/screens/PreviewScreen.tsx` — exibe `route.params` em um cartão.

## Entrega no GitHub

- Repositório público com código funcional.
- `README.md` curto explicando: como rodar, decisões de validação e instruções de uso.
- Commits claros por etapa (criando projeto, telas, passagem de dados, validação).

## Dicas

- Use `route.params?.campo` para acessar parâmetros com segurança.
- Valide email com uma expressão simples: `/^\S+@\S+\.\S+$/`.
- Para formulários longos, use `KeyboardAvoidingView` ou `react-native-keyboard-aware-scroll-view`.
- Teste no dispositivo com Expo Go.

## Tarefa extra:

- Objetivo: aplicar um tema (cores, espaçamento, tipografia) ao `PerfilApp`.
- Passos sugeridos:
	- Crie `src/styles/theme.ts` em `PerfilApp` com cores, espaçamentos e tamanhos de fonte (padrões semelhantes aos do `PrimeiroApp`).
	- Atualize `FormScreen` e `PreviewScreen` para usar o tema via import (`import theme from '../styles/theme'`) e `StyleSheet.create`.
	- Garanta que o `PreviewScreen` apresente um cartão com fundo levemente acinzentado, borda arredondada e espaçamento interno.
	- Use cores primárias para títulos e cores de texto escuras para conteúdo.

## Tarefa extra 2: CRUD Completo — Persistência de dados

### Objetivo

Implementar um **CRUD completo** (Create, Read, Update, Delete) para exemplificar o ciclo completo de gerenciamento de dados locais com `AsyncStorage`.

### Requisitos

1. **Criar (Create)**: Botão `Salvar` que persiste o perfil com um ID único em `AsyncStorage` e abre a `ListScreen`.
2. **Ler (Read)**: Listar todos os perfis salvos na tela `ListScreen`. Ao clicar em um nome, abre `PreviewScreen` com os dados daquele perfil.
3. **Atualizar (Update)**: Na tela `PreviewScreen`, botão `Editar` carrega os dados para `FormScreen` para serem editados.
4. **Deletar (Delete)**: Dois tipos de exclusão:
   - Na `PreviewScreen`: botão `Excluir` remove aquele perfil.
   - Na `ListScreen`: botão `Excluir Todos` remove todos os perfis.

### Fluxo de Navegação

```mermaid
graph LR
    A["📱 FormScreen<br/>(Tela Inicial)<br/>Novo Cadastro"] -->|Salvar| C
    A -->|Listar| C
    C["📱 ListScreen<br/>Lista de Perfis"] -->|Clicar Nome| B
    C -->|Voltar| A
    C -->|Excluir Todos| C
    B["📱 PreviewScreen<br/>Dados do Perfil"] -->|Editar| A
    B -->|Excluir| C
    
    style A fill:#e1f5ff,stroke:#0077cc,stroke-width:3px
    style B fill:#fff4e1,stroke:#ff9800,stroke-width:3px
    style C fill:#e8f5e9,stroke:#4caf50,stroke-width:3px
```

**Resumo do fluxo:**
1. **FormScreen** é a tela inicial → botões "Salvar" ou "Listar"
2. **Salvar** persiste e abre → **ListScreen**
3. **Listar** abre diretamente → **ListScreen**
4. Na **ListScreen**: clicar no nome → **PreviewScreen**
5. Na **PreviewScreen**: 
   - "Editar" → volta para **FormScreen** (com dados)
   - "Excluir" → volta para **ListScreen**
6. Na **ListScreen**: "Voltar" → **FormScreen**

### Passos sugeridos

#### 1. Instalar AsyncStorage

```bash
expo install @react-native-async-storage/async-storage
```

#### 2. Criar `src/services/storage.ts` (helper para AsyncStorage)

```ts
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

#### 3. Modificar `FormScreen` para salvar e editar perfis

```tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { saveItem, loadItem } from '../services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export default function FormScreen({ navigation, route }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Se navegou com um ID para editar, carregar os dados
    if (route.params?.id) {
      (async () => {
        const perfis = (await loadItem<any[]>('perfis')) || [];
        const perfil = perfis.find(p => p.id === route.params?.id);
        if (perfil) {
          setNome(perfil.nome);
          setEmail(perfil.email);
          setBio(perfil.bio);
          setEditingId(perfil.id);
        }
      })();
    }
  }, [route.params?.id]);

  async function handleSave() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    const perfis = (await loadItem<any[]>('perfis')) || [];
    
    if (editingId) {
      // Atualizar perfil existente
      const atualizado = perfis.map(p =>
        p.id === editingId
          ? { ...p, nome, email, bio }
          : p
      );
      await saveItem('perfis', atualizado);
      Alert.alert('Sucesso', 'Perfil atualizado');
    } else {
      // Criar novo perfil
      const novoPerfil = {
        id: String(Date.now()),
        nome,
        email,
        bio
      };
      await saveItem('perfis', [...perfis, novoPerfil]);
      Alert.alert('Sucesso', 'Perfil salvo com sucesso');
    }

    // Limpar form e navegar para lista
    setNome('');
    setEmail('');
    setBio('');
    setEditingId(null);
    navigation.navigate('List');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        style={styles.input}
        multiline
      />
      <Button
        title={editingId ? 'Atualizar' : 'Salvar'}
        onPress={handleSave}
      />
      <Button
        title="Listar"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
});
```

#### 4. Criar `src/screens/ListScreen.tsx` (listar, editar e deletar)

```tsx
import React, { useFocusEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadItem, saveItem } from '../services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const [perfis, setPerfis] = useState<any[]>([]);

  // useCallback Hook: recarrega dados quando a tela fica em foco
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const lista = (await loadItem<any[]>('perfis')) || [];
        setPerfis(lista);
      })();
    }, [])
  );

  async function handleDeleteAll() {
    Alert.alert('Confirmar', 'Deseja deletar TODOS os perfis?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar Todos',
        style: 'destructive',
        onPress: async () => {
          await saveItem('perfis', []);
          setPerfis([]);
          Alert.alert('Sucesso', 'Todos os perfis foram deletados');
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Perfis</Text>
      {perfis.length === 0 ? (
        <Text style={styles.empty}>Nenhum perfil salvo</Text>
      ) : (
        <FlatList
          data={perfis}
          keyExtractor={p => p.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Preview', { id: item.id })}
            >
              <Text style={styles.itemText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.footer}>
        {perfis.length > 0 && (
          <Button title="Excluir Todos" color="red" onPress={handleDeleteAll} />
        )}
        <Button title="Voltar" onPress={() => navigation.navigate('Form')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: { fontSize: 16, color: '#333' },
  footer: { gap: 8, marginTop: 16 },
});
```

#### 5. Criar `src/screens/PreviewScreen.tsx` (visualizar e editar/deletar)

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadItem, saveItem } from '../services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Preview'>;

export default function PreviewScreen({ navigation, route }: Props) {
  const [perfil, setPerfil] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const id = route.params?.id;
      if (id) {
        const perfis = (await loadItem<any[]>('perfis')) || [];
        const encontrado = perfis.find(p => p.id === id);
        setPerfil(encontrado);
      }
    })();
  }, [route.params?.id]);

  async function handleDelete() {
    Alert.alert('Confirmar', 'Deseja deletar este perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          const perfis = (await loadItem<any[]>('perfis')) || [];
          const filtrado = perfis.filter(p => p.id !== perfil.id);
          await saveItem('perfis', filtrado);
          Alert.alert('Sucesso', 'Perfil deletado');
          navigation.navigate('List');
        },
      },
    ]);
  }

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{perfil.nome}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{perfil.email}</Text>

        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{perfil.bio}</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('Form', { id: perfil.id })}
        />
        <Button
          title="Excluir"
          color="red"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginTop: 12 },
  value: { fontSize: 16, color: '#333', marginBottom: 12 },
  buttons: { gap: 8 },
});
```

#### 6. Atualizar `App.tsx` com a nova rota

```tsx
// MODIFICAR: adicionar rota para ListScreen
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormScreen from './src/screens/FormScreen';
import ListScreen from './src/screens/ListScreen';
import PreviewScreen from './src/screens/PreviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Novo Perfil' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Meus Perfis' }} />
        <Stack.Screen name="Preview" component={PreviewScreen} options={{ title: 'Preview' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Checklist de implementação

- [ ] Instalar `@react-native-async-storage/async-storage`
- [ ] Criar `src/services/storage.ts` com funções `saveItem`, `loadItem`, `removeItem`
- [ ] Modificar `FormScreen` para suportar criação e edição com botões "Salvar" e "Listar"
- [ ] Criar `ListScreen` que mostra apenas nomes clicáveis, com botões "Excluir Todos" e "Voltar"
- [ ] Criar `PreviewScreen` que mostra dados do perfil com botões "Editar" e "Excluir"
- [ ] Implementar fluxo: FormScreen → ListScreen → PreviewScreen
- [ ] Implementar edição: PreviewScreen → FormScreen (com route.params.id)
- [ ] Usar `useFocusEffect` para recarregar a lista quando a tela fica em foco
- [ ] Adicionar as rotas `List` e `Preview` no `App.tsx`
- [ ] Testar fluxo completo: criar → listar → visualizar → editar → deletar

### Dicas importantes

- Use `useFocusEffect` do `@react-navigation/native` para recarregar dados quando a tela retorna ao foco.
- Sempre envolva operações de storage em `try/catch` e trate erros.
- Use `Alert.alert()` para confirmações de deletar ou erros de validação.
- Gere IDs únicos com `String(Date.now())` ou `crypto.randomUUID()` (Expo suporta).
- Teste com `expo start` e reinicialize o app para confirmar que os dados persistem.
