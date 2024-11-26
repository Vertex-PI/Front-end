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

### Configuração do projeto via AWS(linux)

Execute uma instancia aws linux com as configurações de sua preferencia. Habilite as portas de entrada nos grupos de segurança(3333 para o site e 3306 para o banco de dados) e hailite a função IAM.

Apos todas as configurações crie um arquivo .sh na sua instacia:

```bash
sudo nano nome_arquivo.sh
```

É dentro do arquvio cole o codigo abaixo e salve o mesmo:

```bash
#!/bin/bash

sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose -y

sudo systemctl start docker
sudo systemctl enable docker

if [ -z "$(sudo docker network ls --filter name=rede-vertex -q)" ]; then
  sudo docker network create rede-vertex
fi

echo "Criando diretórios para arquivos locais, se necessário..."
mkdir -p ~/dockerBD/arquivos_sql
mkdir -p ~/dockerND
mkdir -p ~/dockerJAVA

echo "Criando arquivo docker-compose.yml..."
cat <<EOL > ~/docker-compose.yml
version: '3.8'

services:
  db:
    image: gusttarizerio/vertex:imagem-bd-vertex
    container_name: container-bd-vertex
    environment:
      MYSQL_ROOT_PASSWORD: urubu100
      MYSQL_DATABASE: Vertex
    ports:
      - "3306:3306"
    networks:
      - rede-vertex
    volumes:
      - db_data:/var/lib/mysql

  node-app:
    image: gusttarizerio/vertex:imagem-node-vertex
    container_name: container-node-vertex
    ports:
      - "3333:3333"
    networks:
      - rede-vertex
    depends_on:
      - db

  java-app:
    image: gusttarizerio/vertex:imagem-java-vertex
    container_name: container-java-vertex
    networks:
      - rede-vertex
    depends_on:
      - db
      - node-app

networks:
  rede-vertex:

volumes:
  db_data:

EOL


echo "Iniciando os containers com Docker Compose..."
cd ~
sudo docker-compose up -d

echo "Containers MySQL, Node.js e Java foram configurados e iniciados com sucesso usando imagens do Docker Hub!"
```

Apos salvar o arquivo de as permissões necessarias para execução:
```bash
sudo chmod +x nome_arquivo.sh
```
Execute o arquivo:
```bash
./nome_arquivo.sh
```
Abra o site com o ipv4 publico da instancia:
```bash
http://ip.da.instancia:3333
```

### Instalação via CLI (Windows)

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