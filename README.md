<h1 align="center">
  <img
    width=600
    height=200
    alt="intensivet"
    src="https://intensivet.com.br/wp-content/uploads/2020/10/logo-intensivet-2-1024x328.png"
  />
</h1>

<h1 align="center">Intensivet</h1>
<p align="center">Aplicativo de mensagens para interconsultas</p>

<img height=400 src="https://github.com/henriquebarrosx/IntensivetApp/assets/48387142/2d85fa7b-69b3-4036-96cb-89e2b95ecbba" />
<img height=400 src="https://github.com/henriquebarrosx/IntensivetApp/assets/48387142/acca54a5-f855-4503-af7c-479c2e44bef5" />
<img height=400 src="https://github.com/henriquebarrosx/IntensivetApp/assets/48387142/1d091866-0c2b-492d-afbd-d5e679f944cc" />
<img height=400 src="https://github.com/henriquebarrosx/IntensivetApp/assets/48387142/4c7e7d64-4310-4e9a-9d29-4a1138372a90" />

### Funcionalidades

- [x] Login
- [x] Lista de casos
  - [x] Ordenados por última mensagem enviada
  - [x] Ordenados por SLA
- [x] Chat
  - [x] Envio de texto
  - [x] Envio de imagens
  - [x] Envio de vídeos
  - [x] Envio de arquivos
  - [x] Envio e Gravação de vídeo
  - [x] Envio e Gravação de áudio
  - [x] Detalhes do caso
    - [x] Animal
    - [x] Veterinário
    - [X] Clínica
    - [X] Categoria
    - [X] Ficha Veterinária

### ⚙️ Ferramentas

- [Node.js (18.12.1)](https://nodejs.org/en/)
- [Expo (Versão: 49.0.0)](https://docs.expo.dev/)
- [React Native (Versão: 0.72.4)](https://reactnative.dev/docs/0.72/getting-started)

### 🛠️ Configuração do ambiente

- [Configurar ambiente React Native](https://reactnative.dev/docs/0.72/environment-setup)
- [Baixar Android Studio (Apenas Android)](https://developer.android.com/studio)
- [Baixar XCode (Apenas iOS)](https://developer.apple.com/xcode/resources/)
- [Iniciar projeto com simulador (Apenas iOS)](https://docs.expo.dev/workflow/ios-simulator/)

**OBS: Para que seja possível iniciar o projeto é necessário que sua máquina possua ao menos um emulador ou simulador presente. Emuladores podem ser adquiridos através do Android Studio. Já os simuladores são exclusivos do ambiente Apple, podendo ser adquiridos somente através do XCode.**

Você também pode rodar o projeto diretamente pelo próprio celular, bastando apenas baixar o aplicativo Expo e ler o QRCode, gerado após o comando `yarn start`, sem a necessidade de baixar Android Studio e ou XCode. 

Esse tipo de abordagem é muito útil para fins de testes de comportamento. Porém, vale salientar que, ele está sujeito a alguns problemas relacionados a cache em memória, bem como uma demanda maior de tempo para compilação do app.

Caso você não queira depender de um aparelho externo É interessante que toda configuração do ambiente Android seja seguida da aba "React Native CLI Quickstart". 

### 💡 Iniciando o projeto

```bash
# Clone o repositório
$ git clone git@github.com:nywton/intensivet-react-app.git

# Entre na pasta
$ cd intensivet-react-app

# Instale as dependencias
$ yarn install

# Inicie o app
$ yarn start
```

### 🚀 Publicando Projeto

```bash
# Instale a linha de comando eas-cli
$ npm install -g eas-cli

# Enviando para Apple Store
$ npx eas-cli build --platform ios

# Enviando para Apple Store
$ npx eas-cli submit --platform ios

# Enviando para Google Play
$ npx eas-cli submit --platform android
```

**É necessário possuir um AppleID, para publicação de apps no iOS, e a uma conta do [Expo](https://expo.dev) para intermediar o envio para [Apple Store Connect](https://appstoreconnect.apple.com/).**
