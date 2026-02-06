# Contexto do Projeto — PrimeiroApp

## Visão geral
Projeto React Native iniciado com o template "blank (TypeScript)" do Expo. Objetivo: aprender React Native com TypeScript usando uma configuração mínima.

## Estrutura de arquivos (na raiz)
- [app.json](../app.json): Configurações do Expo (nome, ícones, splash, plataformas).
- [App.tsx](../App.tsx): Componente principal do app (componente funcional padrão criado pelo template).
- [index.ts](../index.ts): Ponto de entrada que registra o componente raiz com `registerRootComponent`.
- [package.json](../package.json): Dependências e scripts do projeto.
- [tsconfig.json](../tsconfig.json): Configuração TypeScript estendendo `expo/tsconfig.base`.
- `assets/`: Imagens usadas (ícone, splash, favicon, adaptive icon).

## Dependências principais (extraído de `package.json`)
- `expo` ~54.0.33
- `expo-status-bar` ~3.0.9
- `react` 19.1.0
- `react-native` 0.81.5

DevDependencies:
- `@types/react` ~19.1.0
- `typescript` ~5.9.2

## Scripts úteis (`package.json`)
- `npm run start` — `expo start`
- `npm run android` — `expo start --android`
- `npm run ios` — `expo start --ios`
- `npm run web` — `expo start --web`

## Configuração TypeScript
- `tsconfig.json` estende `expo/tsconfig.base` e ativa `strict: true`.

## app.json (pontos relevantes)
- `name`: "PrimeiroApp"
- Ícones e splash apontando para `assets/` (`icon.png`, `splash-icon.png`, `adaptive-icon.png`, `favicon.png`).
- `orientation`: `portrait`
- `userInterfaceStyle`: `light`
- Flags Android/IOS e `newArchEnabled: true` estão presentes no template.

## Arquivo `App.tsx` (resumo)
- Componente funcional padrão exportado como `default`.
- Usa `expo-status-bar` e `StyleSheet` do React Native.
- Estrutura básica:
  - `View` centralizado com `Text` contendo mensagem inicial do template.
  - Estilos: `flex: 1`, `backgroundColor: '#fff'`, alinhamento central.

Trecho principal (descrição): uma tela branca com texto de instrução e `StatusBar` configurada para `auto`. Ideal para começar a substituir pelo seu conteúdo.

## Arquivo `index.ts` (resumo)
- Chama `registerRootComponent(App)` do `expo` — garante inicialização correta no Expo Go e em builds nativos.

## Assets
Arquivos presentes em `assets/`:
- `adaptive-icon.png`
- `favicon.png`
- `icon.png`
- `splash-icon.png`

## Como rodar o projeto
1. Instalar dependências:

```bash
npm install
```

2. Iniciar o Metro/Expo:

```bash
npm run start
```

3. Abrir no dispositivo/emulador via Expo Go ou usar os scripts `npm run android` / `npm run ios`.

## Observações e próximos passos sugeridos
- Substituir o conteúdo de `App.tsx` para começar a criar telas e componentes.
- Considerar adicionar `react-navigation` para navegação entre telas.
- Ativar/ajustar `strict` e regras do TypeScript conforme necessário (já está `strict: true`).
- Atualizar `app.json` com nomes de bundle/ID de pacote antes de builds nativos.

---
Gerado automaticamente a partir dos arquivos do projeto para servir como referência inicial.
