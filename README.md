# pucrs-tcc

## Imagens Docker:

Front end: https://hub.docker.com/r/feehpadula/pucrs-tcc-app

Back end: https://hub.docker.com/r/feehpadula/pucrs-tcc-server

## APIs

https://documenter.getpostman.com/view/25583779/2s9YsJDYqE

## Configuração back end (/server)

1. Criar arquivo `.env` na raiz do diretório;
2. Inserir neste arquivo uma nova chave JWT (https://www.npmjs.com/package/jsonwebtoken)<br>

```
JWT_TOKEN="[CHAVE]"
```

3. No arquivo `index.js` definir a porta a ser utilizada (linha 4)

```
const port = [PORTA];
```

4. No arquivo `config.js` definir a conexão com a base de dados

```
  host: "[HOST]",
  user: "[USUARIO]",
  password: "[SENHA]",
  database: "[BASEDEDADOS]",
```

## Inicialização back end (/server)

1. Instalar os pacotes NPM (pular para etapa dois caso já executado)

```
  npm install
```

2. Iniciar o servidor

```
  node index.js
```

## Configuração front end (/app)

1. No arquivo `/src/services/Api.js` definir a URL base do servidor back end (linha 4)

```
baseURL: "[URL]",
```

## Inicialização front end (/app)

1. Instalar os pacotes NPM (pular para etapa dois caso já executado)

```
  npm install
```

2. Iniciar a aplicação

```
  npm run start
```

3. Realizar testes

```
  npm run test
```

4. Compilar a aplicação

```
  npm run build
```
