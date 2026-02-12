# PrimeiroApp

Projeto exemplo para aprendizado de React Native com Expo + TypeScript.

## Objetivo
Oferecer um ponto de partida claro para alunos aprenderem React Native, com instruções passo a passo e material publicável no GitHub.
 
## Como usar este repositório
Este repositório é um material para aprendizado. Siga os passos em ordem e execute cada tutorial por conta própria antes de passar ao próximo.

1) **Como criar e rodar o app** — configure seu ambiente e rode o projeto localmente. [Clique aqui](docs/HOW_TO_CREATE_AND_RUN.md)
2) **Adicionando telas e navegação** — implemente telas e navegação básica. [Clique aqui](docs/ADD_SCREEN_AND_NAVIGATION.md)
3) **Passando dados entre telas** — aprenda a enviar/receber parâmetros entre telas. [Clique aqui](docs/PASS_DATA_BETWEEN_SCREENS.md)
4) **Passando dados via TextInput** — capturar `nome` em um `TextInput` e passar para outra tela. [Clique aqui](docs/PASS_DATA_INPUT.md)
5) **Persistência local (AsyncStorage)** — passo a passo para persistir dados localmente. [Clique aqui](docs/PERSISTENCE_ASYNC_STORAGE.md)
6) **Guia de Estilo (documentação)** — material ANTES/DEPOIS para aplicar tema e estilos no `PrimeiroApp` (documentação, não altera o app). [Clique aqui](docs/STYLING_GUIDE_PRIMEIROAPP.md)
7) **Atividade prática** — crie um projeto separado aplicando o que aprendeu e publique no GitHub. [Clique aqui](docs/atividade-pratica.md)

Faça commits pequenos e descritivos a cada etapa (criação, telas, navegação, passagem de dados, validação).

## Fluxo de persistência usado nos tutoriais

Os exemplos e guias de persistência usam o seguinte fluxo entre telas (útil para exercícios e para o `PerfilApp`):

- **`HomeScreen` — salvar dados:** captura/insere dados e grava numa lista em AsyncStorage (ex.: chave `mensagens`).
- **`SecondScreen` — listar & deletar:** carrega a lista (`mensagens`), exibe em `FlatList`, permite deletar itens e, ao tocar em um item, navega para `ThirdScreen` para editar.
- **`ThirdScreen` — editar/atualizar:** carrega o item selecionado por `id`, permite edição e grava a versão atualizada em storage.

Consulte os guias detalhados: [Persistência (AsyncStorage)](docs/PERSISTENCE_ASYNC_STORAGE.md), [Deletar dados](docs/DELETE_ASYNC_STORAGE.md) e [Atualizar dados](docs/UPDATE_ASYNC_STORAGE.md).