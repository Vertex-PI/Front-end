# Monitoramento de Energia Elétrica

Nosso projeto de **Monitoramento de Energia Elétrica** na Casa Civil visa implementar um sistema para acompanhar o consumo de energia através de uma base de dados. A solução permitirá o registro e a análise de dados históricos de consumo, facilitando a identificação de padrões, a otimização do uso de energia e a redução de custos. O sistema centralizará as informações coletadas, fornecendo relatórios detalhados e insights para melhorar a eficiência energética e apoiar a tomada de decisões informadas.

## Funcionalidades

- Monitoramento histórico de consumo de energia
- Relatórios detalhados com gráficos e tabelas
- Centralização das informações em uma base de dados
- Interface amigável e fácil de navegar
- Possibilidade de adicionar novas metas de consumo

## Tecnologias Utilizadas

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,npm,mysql,git,github,docker" />
  </a>
</p>

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org) - Versão 18 ou superior
- [MySQL](https://dev.mysql.com/downloads/mysql/) - Banco de dados para armazenar os dados de consumo
- Um navegador moderno (Chrome, Firefox, etc.)

## Instalação

### Instalação pelo docker

Crie a imagem para rodar o node:
```bash
  docker build --pull --rm -f "dockerfile" -t frontend:latest "."
```
Crie o container que ira rodar na porta 3333 e utilizara a imagem criada
para o node:
```bash
  docker run -d --name ContainerNode -p 3333:3333 frontend:latest
```

### Instalação via CLI

### 1. Clone o repositório

```bash
git clone https://github.com/vertex/front-end.git
```

### 2. Entre no repositório
```bash
cd monitoramento-energia
```

### 3. Instale as dependências do projeto
```bash
npm install
```

## 4. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as seguintes informações:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

## 5. Configure o Banco de Dados

Crie o banco de dados no MySQL utilizando o comando:
```bash
CREATE DATABASE vertex;
```
ou use o repositorio '[JDBC](https://github.com/Vertex-PI/JDBC.git)' para criar o banco, so seguir o readme do projeto.

## 6. Inicie o servidor
Crie o banco de dados no MySQL utilizando o comando:
```bash
npm start
```
O servidor estará rodando em http://localhost:8080.

ou
```bash
npm run dev
```
O servidor estará rodando em http://localhost:3333.

## Principais Dependências

- [Express](https://expressjs.com/) - Framework para Node.js
- [MySQL](https://dev.mysql.com/downloads/mysql/) - Conexão com o banco de dados MySQL

- [dotenv](https://www.npmjs.com/package/dotenv) - Carrega variáveis de ambiente

- [Chart.js ](https://www.npmjs.com/package/dotenv) - Biblioteca de gráficos para visualização de dados

## Licença

[MIT](https://choosealicense.com/licenses/mit/)