<h1 align="center">
    Simple Blog API
</h1>

<nav>
  <ul style="list-style:none;display:flex;justify-content:center;gap:40px;">
    <li>
      <a href="#projeto">Projeto</a>
    </li>
    <li>
      <a href="#tecnologias">Tecnologias</a>
    </li>
    <li>
      <a href="#estrutura">Estrutura</a>
    </li>
    <li>
      <a href="#requisitos">Pré-Requisitos</a>
    </li>
    <li>
      <a href="#configuracoes">Configurações</a>
    </li>
  </ul>
</nav>

<h2 id="projeto">💻 Projeto</h2>

O projeto construído é uma API REST para um Blog simples, onde podemos ver todas as publicações, criar novas, editar e excluí-las, desta forma teremos um CRUD (Create, Read, Update, Delete) completo.

Novas técnologias e funcionalidade:

- 04/01/24 - Separação do Front End do Back End, e inicio do desenvolvimento da API;
- 02/12/23 - Introdução do JSDoc, uma API geradora de documentações para JavaScript;
- 01/12/23 - Introdução do Padrão de Projetos MVC (Model, View, Controller), onde podemos dividir e visualizar melhor as responsabilidades dentro do Back-End;
- 31/10/23 - Introdução do arquivo .env, um gerenciador de informações sensíveis para desenvolvedores.

<h2 id="tecnologias">🚀 Tecnologias</h2>

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [.ENV](https://www.dotenv.org/)
- [JSDoc](https://jsdoc.app/)


<h2 id="estrutura">🗃 Estrutura do Projeto</h2>

```
- backend
  - controllers
    - post.controller.js
  - data
    -database.js
  - models
    - post.model.js
  - routes
    - blog.js
  - data
    - database.js
- .gitignore
- .env.example
- app.js
- jsdoc.json
- package-lock.json
- package.json
- README.md
```

<h2 id="requisitos">👀 Pre-requisitos</h2>

Antes de começar, você precisará ter as seguintes ferramentas instaladas em seu computador:<br/>
[Git](https://git-scm.com) para clonar esse repositório;<br/>
Um editor de código como o [VSCode](https://code.visualstudio.com/);<br/>
Um Runtime, como o [NodeJs](https://nodejs.org/en), para que seu código seja executado.

<h2 id="configuracoes">👨‍💻 Iniciando o projeto</h2>

```
# Clone este repositório em sua pasta atual.
$ git clone <https://github.com/Arthur-Ferreira/SimpleBlog_API> .

# Ou clone este repositório em uma nova pasta.
$ git clone <https://github.com/Arthur-Ferreira/SimpleBlog_API>

# Acesse a pasta do projeto no terminal/cmd
$ cd "SimpleBlog_API"

# Instale as dependências do projeto
$ npm install

# Para iniciar o projeto
$ npm start
```

<p align="center">
Made with 🖤 by ARTHUR FERREIRA
</p>
