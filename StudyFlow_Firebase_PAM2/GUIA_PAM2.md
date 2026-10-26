# StudyFlow — Firebase passo a passo para PAM 2

## 1. O que foi analisado

O ZIP original contém um aplicativo React Native com Expo SDK 54, React Navigation e três telas: Início, Minhas tarefas e Calculadora de foco. Não há Firebase, login ou banco de dados. Em TasksScreen.js, useState(initialTasks) mantém as tarefas somente na memória; ao remontar a tela ou reiniciar o app, as alterações podem se perder. FocusScreen.js calcula valores, mas não guarda histórico.

O README apresenta quatro exercícios: componentes, navegação, listas e inputs funcionais. Este roteiro acrescenta persistência e CRUD a esses exercícios. Como o material específico do professor não veio no ZIP, esta é uma proposta didática compatível com o projeto, e não uma reprodução da aula.

## 2. Qual banco usar

Vamos usar **um banco Cloud Firestore**, com duas subcoleções por usuário. Não é necessário criar dois bancos, instalar MySQL ou executar SQL. Firestore é um banco NoSQL: coleções agrupam documentos, e documentos possuem campos.

Firebase Authentication identifica o usuário. Firestore armazena tarefas e planos. Authentication não é uma tabela de senhas no Firestore.

| Caminho | Finalidade |
|---|---|
| `usuarios/{uid}/tarefas/{id}` | Tarefas daquele usuário |
| `usuarios/{uid}/sessoesFoco/{id}` | Planos de estudo calculados e salvos |

`uid` é o identificador emitido pelo Authentication. `id` é gerado por addDoc. O documento pai `usuarios/{uid}` pode aparecer sem campos: subcoleções não exigem que o documento pai exista. Esta versão não grava um perfil de usuário.

### Campos de tarefas

| Campo | Tipo no console | Exemplo |
|---|---|---|
| title | string | Revisar conteúdo de PAM |
| category | string | Escola |
| done | boolean | false |
| createdAt | timestamp | Preenchido pelo servidor |
| updatedAt | timestamp | Preenchido pelo servidor |

O ID não precisa ser um campo: o app o lê do identificador do documento. Título: 1–150 caracteres. Categoria: 1–60; quando vazia no formulário, o app usa Geral.

### Campos de sessoesFoco

| Campo | Tipo no console | Exemplo |
|---|---|---|
| subject | string | Matemática |
| focus | number | 25 |
| rest | number | 5 |
| cycle | number | 30 |
| cyclesInTwoHours | number, valor inteiro | 4 |
| focusedInTwoHours | number | 100 |
| createdAt | timestamp | Preenchido pelo servidor |

Esses registros são **planos calculados**, não comprovação de sessões realizadas. O formulário exige foco > 0, intervalo >= 0 e soma <= 120 minutos. Foi corrigido o cálculo original, que forçava um ciclo mesmo quando a duração ultrapassava duas horas.

## 3. Criar o projeto no Firebase

1. Entre em https://console.firebase.google.com/ com sua conta Google.
2. Clique em criar/adicionar projeto. Use o nome `studyflow-pam2` ou outro nome disponível.
3. Google Analytics é opcional e não é usado neste exercício.
4. Conclua a criação e abra o projeto.
5. Use o plano Spark para a atividade, respeitando as cotas gratuitas exibidas no console. Este exemplo não usa Storage, Functions nem serviços que exijam ativar cobrança.

Os nomes e a posição dos menus podem variar conforme o idioma do console.

## 4. Registrar o aplicativo

1. Na página do projeto, clique no ícone Web `</>` para adicionar um app.
2. Dê o apelido `studyflow-expo`.
3. Não é necessário configurar Hosting para rodar localmente.
4. Clique em registrar app.
5. Na configuração do SDK, localize o objeto `firebaseConfig`.
6. Guarde os seis valores: apiKey, authDomain, projectId, storageBucket, messagingSenderId e appId.

Mesmo usando React Native, este projeto utiliza o Firebase JavaScript SDK. O registro Web atende ao exemplo Expo e Expo Web. Não misture este roteiro com instalação de `@react-native-firebase/*` ou chaves de conta de serviço.

## 5. Habilitar Authentication

1. Abra Authentication no menu do projeto.
2. Clique em começar, se aparecer.
3. Abra métodos/provedores de login.
4. Ative **Anônimo (Anonymous)** e salve.

Ao abrir o app, signInAnonymously cria uma identidade sem formulário de login. Em Authentication > Usuários você verá o UID. A tela de tarefas também exibe esse UID para facilitar a demonstração.

A identificação é persistida no navegador e, no código nativo, com AsyncStorage. Limpar os dados do navegador, reinstalar o app ou usar outro dispositivo pode gerar uma identidade diferente. Os registros anteriores continuam no banco, mas a nova identidade não pode lê-los. Para recuperar dados em vários aparelhos, a evolução indicada é vincular a conta anônima a e-mail/senha; isso não foi implementado neste exercício.

## 6. Criar o Firestore

1. Abra Firestore Database / Cloud Firestore no menu.
2. Clique em criar banco de dados.
3. Se houver escolha de edição, use **Standard**, com banco `(default)`.
4. Selecione uma localização próxima do público, conforme disponibilidade. Escolha com atenção: a localização do banco não pode ser trocada depois.
5. Use modo de produção, inicialmente com acesso restrito.
6. Conclua a criação.
7. Abra a aba **Regras / Rules**.
8. Abra o arquivo `firestore.rules` deste pacote, copie todo o conteúdo para o editor do console e clique em **Publicar**.

As regras verificam o UID e os campos. Um usuário só pode acessar suas próprias subcoleções. Não substitua por acesso público `allow read, write: if true`.

Você não precisa criar as coleções manualmente: elas surgem na primeira gravação feita pelo app. Um arquivo JSON comum não deve ser importado como se fosse SQL ou um dump do Firestore.

## 7. Preparar o projeto no computador

1. Extraia o ZIP entregue e abra a pasta `StudyFlow_Firebase_PAM2` no VS Code.
2. Abra o terminal nessa pasta, onde está `package.json`.
3. Use Node.js compatível com Expo SDK 54, preferencialmente Node 22 LTS. O README original que diz apenas “18 ou superior” é genérico demais para esse SDK.
4. Confira `node -v` e `npm -v`.
5. Instale as dependências:

```bash
npm install
```

O pacote já inclui `firebase` versão 12 e AsyncStorage no package.json. Ao instalar essas dependências manualmente em uma cópia do projeto original, o comando equivalente é:

```bash
npx expo install firebase @react-native-async-storage/async-storage
```

## 8. Preencher a configuração

1. Na raiz do projeto, faça uma cópia de `.env.example` chamada `.env`.
2. Cole os valores reais do seu objeto firebaseConfig, usando esta correspondência:

| Campo do Firebase | Variável no .env |
|---|---|
| apiKey | EXPO_PUBLIC_FIREBASE_API_KEY |
| authDomain | EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN |
| projectId | EXPO_PUBLIC_FIREBASE_PROJECT_ID |
| storageBucket | EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET |
| messagingSenderId | EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID |
| appId | EXPO_PUBLIC_FIREBASE_APP_ID |

Exemplo ilustrativo, que deve ser substituído:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=valor_exato_do_console
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

Use os valores do mesmo projeto. Não invente o nome do bucket. As variáveis EXPO_PUBLIC são visíveis no app; a proteção dos registros vem das regras e da autenticação. Nunca coloque uma chave privada de conta de serviço nelas.

## 9. Executar

Para abrir no navegador, use:

```bash
npx expo start --web --clear
```

Depois, `npm run web` também funciona. No navegador aparecerá o StudyFlow. Ele primeiro autentica e depois libera as telas.

Para iniciar visando celular:

```bash
npm run mobile
```

O projeto foi mantido no Expo SDK 54. Se o Expo Go instalado não aceitar esse SDK, use uma versão compatível ou planeje a atualização do projeto separadamente. Para esta atividade, priorize o navegador, como no projeto original.

## 10. Criar os primeiros dados e conferir

1. Abra Minhas tarefas. A lista começa vazia, pois as tarefas locais de demonstração não foram importadas automaticamente.
2. Digite `Revisar conteúdo de PAM`, categoria `Escola`, e clique em adicionar.
3. No console Firebase, abra Firestore > Dados.
4. Você verá `usuarios` > seu UID > `tarefas` > ID automático.
5. Abra o documento e confira title, category, done e os timestamps.
6. Marque a tarefa como concluída. O campo done deve mudar para true.
7. Recarregue a página no mesmo navegador. A tarefa deve continuar aparecendo.
8. Exclua a tarefa. O documento deve desaparecer do console.
9. Abra Foco, informe Matemática, 25 e 5. Calcule: 4 ciclos e 100 minutos de foco.
10. Clique em **Salvar plano no Firebase**.
11. Confira a subcoleção `sessoesFoco` e o histórico na tela. A tela mostra até dez planos mais recentes, embora o listener atual leia todo o histórico; para uma versão maior, adicione paginação/limit.

Se quiser preencher uma tarefa manualmente pelo console, primeiro abra o app para obter o UID real. Use `usuarios/{UID_REAL}/tarefas`, crie um ID automático e preencha todos os campos da tabela com os tipos corretos. Operações feitas no console por um administrador não validam as regras de acesso do aplicativo; por isso o teste principal deve ser pelo app.

## 11. Entender o CRUD para apresentar em PAM 2

| Conceito | Função do pacote | Operação Firebase | Na interface |
|---|---|---|---|
| Create — criar | createTask | addDoc | Adicionar tarefa |
| Read — ler | watchTasks | onSnapshot e query | Exibir na FlatList |
| Update — atualizar | changeTask | updateDoc | Concluir/desmarcar |
| Delete — excluir | deleteTask | deleteDoc | Excluir tarefa |

Fluxo: o input recebe o texto; o serviço envia ao Firestore; o listener onSnapshot recebe a lista atualizada; setTasks atualiza o estado; FlatList redesenha os itens. A atualização de uma tarefa é demonstrada pelo campo done; edição do texto não foi acrescentada.

Os cálculos continuam no aplicativo. O botão Salvar envia o resultado ao banco, onde as regras conferem os valores. serverTimestamp usa o horário do servidor. O retorno de onSnapshot no useEffect remove o listener quando a tela é desmontada.

## 12. Arquivos e responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| src/config/firebase.js | Inicializar app Firebase e Firestore |
| src/config/auth.web.js | Autenticação no navegador |
| src/config/auth.js | Autenticação nativa com AsyncStorage |
| src/context/AuthContext.js | Entrar anonimamente e disponibilizar usuário |
| src/services/database.js | Centralizar operações do banco |
| src/screens/TasksScreen.js | Formulário, lista e CRUD |
| src/screens/FocusScreen.js | Cálculo, salvamento e histórico |
| firestore.rules | Segurança e validação dos campos |
| .env.example | Modelo de configuração |

O arquivo initialTasks.js foi preservado como referência do projeto original, mas não alimenta mais a lista.

## 13. Problemas comuns

| Erro/sintoma | O que conferir |
|---|---|
| Preencha o arquivo .env | Nome do arquivo, seis valores e localização ao lado de package.json; reinicie o Expo |
| auth/invalid-api-key | apiKey copiada do app Web correto |
| auth/operation-not-allowed | Ative o provedor Anônimo no Authentication |
| permission-denied / Missing or insufficient permissions | Publique firestore.rules no banco correto e confirme que o app autenticou |
| Projeto errado ou lista vazia | projectId e UID; janela anônima e outro navegador criam identidades diferentes |
| auth/network-request-failed / unavailable | Internet, bloqueios de rede e serviços do Firebase |
| Dependência não encontrada | Execute npm install dentro da pasta do projeto |
| Gravação demora e não conclui | Verifique internet; esta demonstração deve ser realizada online |
| Expo Go incompatível | Prefira Expo Web para a aula ou alinhe a versão nativa com o SDK 54 |

## 14. Checklist de demonstração

- Criar e listar duas tarefas.
- Marcar uma como concluída e desmarcar.
- Recarregar a página e conferir persistência.
- Excluir uma tarefa e verificar no console.
- Salvar um plano de foco e conferir seu histórico.
- Abrir uma janela anônima: ela deve receber outro UID e não enxergar os registros anteriores.
- No Rules Playground do console, testar uma leitura de caminho de UID A com usuário autenticado de UID B: deve negar; sem autenticação também deve negar.
- Explicar a diferença entre estado temporário no React, persistência no banco e identidade do usuário.

## 15. O que está pronto e o que falta validar

O código de integração, o modelo de dados e as regras estão incluídos. Nenhum projeto foi criado na sua conta Google, pois não há acesso autenticado ao seu console. Você precisa concluir as etapas 3–9. A gravação real, o funcionamento no navegador/celular e a publicação das regras dependem desse ambiente e ainda precisam ser testados. Não há promessa de execução validada ponta a ponta nem de regras compiladas pelo serviço nesta entrega.

## Fontes oficiais consultadas em 26/10/2026

- Expo e Firebase: https://docs.expo.dev/guides/using-firebase/
- Criar Cloud Firestore: https://firebase.google.com/docs/firestore/quickstart
- Authentication anônimo: https://firebase.google.com/docs/auth/web/anonymous-auth
- Regras do Firestore: https://firebase.google.com/docs/firestore/security/get-started
- Persistência React Native: https://firebase.google.com/docs/reference/js/auth
- Funções matemáticas das regras: https://firebase.google.com/docs/reference/rules/rules.math
