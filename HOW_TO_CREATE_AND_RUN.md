# Como criar e rodar este primeiro app (Expo + TypeScript)

Este guia mostra os passos mínimos para criar um projeto React Native com Expo (template TypeScript), como rodar no celular usando Expo Go e como rodar no navegador web.

## 1 — Criar o projeto
Use o comando abaixo para criar um novo projeto com o template "blank (TypeScript)":

```bash
npx create-expo-app@latest MeuApp --template expo-template-blank-typescript
```

Depois entre na pasta do projeto:

```bash
cd MeuApp
```

Instale dependências (normalmente o `create-expo-app` já instala, mas caso necessário):

```bash
npm install
```

## 2 — Rodar no celular com Expo Go
1. Instale o app **Expo Go** no seu celular (Android ou iOS) pela Play Store/App Store.
2. No computador, inicie o bundler do Expo:

```bash
npx expo start
```

3. Certifique-se de que o celular e o computador estão conectados a mesma rede. Abra o Expo Go no celular e escaneie o QR code mostrado no terminal ou no painel web do Expo.

Observações:
- Se não puder usar a mesma rede, o Expo oferece alternativas (`tunnel`) que podem funcionar, mas a experiência mais estável é com ambos na mesma rede local.

```bash
npx expo start --tunnel
```

- Para Android você também pode instalar um APK gerado por `eas build` (requer configuração do EAS/Expo) sem usar o Expo Go.

## 3 — Rodar no navegador (web)
Para rodar como aplicação web (React Native Web) use:

```bash
npx expo start --web
```

Isso abre uma versão web do app no navegador. É útil para desenvolvimento rápido e evita dependências de emulador/dispositivo.
