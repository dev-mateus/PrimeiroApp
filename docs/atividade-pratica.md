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
- Opcional: botão `Salvar localmente` que persiste os dados em `AsyncStorage`.

## Sugestão de comandos iniciais

Use o template `default` e crie o projeto com o comando abaixo:

```bash
npx create-expo-app@latest PerfilApp
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

## Tarefa extra: Recriar o estilo do PrimeiroApp em `PerfilApp`

- Objetivo: aplicar um tema (cores, espaçamento, tipografia) ao `PerfilApp`.
- Passos sugeridos:
	- Crie `src/styles/theme.ts` em `PerfilApp` com cores, espaçamentos e tamanhos de fonte (padrões semelhantes aos do `PrimeiroApp`).
	- Atualize `FormScreen` e `PreviewScreen` para usar o tema via import (`import theme from '../styles/theme'`) e `StyleSheet.create`.
	- Garanta que o `PreviewScreen` apresente um cartão com fundo levemente acinzentado, borda arredondada e espaçamento interno.
	- Use cores primárias para títulos e cores de texto escuras para conteúdo.
