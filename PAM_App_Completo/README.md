# StudyFlow PAM — versão Web

Aplicativo desenvolvido em **React Native + Expo**, configurado para rodar diretamente no navegador usando **Expo Web**.

O projeto reúne os requisitos das quatro atividades de PAM em um único aplicativo:

- interface visual com componentes React Native e estilização;
- navegação entre múltiplas telas;
- uso de lista dinâmica com `FlatList`;
- inputs funcionais que executam ações;
- compatibilidade com navegador.

## Requisitos

Instale no computador:

- Node.js 18 ou superior;
- npm.

## Como executar no navegador

Abra o terminal dentro da pasta do projeto e execute:

```bash
npm install
npm run web
```

Também é possível usar:

```bash
npm start
```

Nesta versão, `npm start` já inicia diretamente o Expo Web.

O terminal mostrará o endereço local do projeto, normalmente semelhante a:

```text
http://localhost:8081
```

O Expo também pode abrir o navegador automaticamente.

## Executar no celular, se necessário

A versão mobile continua disponível:

```bash
npm run mobile
```

Depois utilize o Expo Go e o QR Code exibido no terminal.

## Telas

### Início

Tela inicial com apresentação do StudyFlow e navegação para os demais recursos.

### Minhas tarefas

Demonstra o requisito de listas usando `FlatList`. É possível visualizar e alterar o estado das tarefas.

### Calculadora de foco

Possui inputs funcionais. O usuário informa dados e o aplicativo realiza o cálculo/gera um resultado, demonstrando tratamento de entrada e interação.

## Relação com as atividades

### Exercício 1 — Design e componentes

O projeto utiliza componentes como `View`, `Text`, `Pressable`, `ScrollView`, `TextInput`, estilos com `StyleSheet` e organização visual completa.

### Exercício 2 — Navegação e duas telas

O app utiliza React Navigation e possui três telas independentes:

- Início;
- Tarefas;
- Foco.

### Exercício 3 — List

A tela de tarefas utiliza `FlatList` para renderizar uma coleção de itens dinamicamente.

### Exercício 4 — Inputs funcionais

A tela de foco utiliza `TextInput`, valida os valores digitados e executa uma ação a partir deles.

## Tecnologias

- Node.js/npm;
- React;
- React Native;
- Expo;
- Expo Web;
- React Native Web;
- React Navigation.

## Comandos principais

```bash
npm install
npm run web
```

ou simplesmente:

```bash
npm install
npm start
```
