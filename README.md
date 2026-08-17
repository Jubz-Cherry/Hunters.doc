Hunters.doc

Aplicação full-stack inspirada no conceito do diário de caçadores da série Supernatural.
A proposta é criar um “diário digital” onde usuários podem pesquisar e consultar os monstros e armas da série, como também suas histórias, origens e fraquezas.

Arquitetura
- Backend:
Node.js
Express
MongoDB
Mongoose
API REST

Estrutura básica:
backend/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── config/
 └── server.js

- Frontend:
React
Axios (ou fetch, se for o caso)
Componentização
Consumo da API própria

Estrutura básica:
frontend/
 ├── components/
 ├── pages/
 ├── services/
 └── App.js

Funcionalidades:

Cadastro de monstros (via backend)
Listagem de monstros
Página de detalhes
Integração com banco de dados MongoDB
Comunicação completa entre frontend e backend

Como Rodar o Projeto?:

1️. Clone o repositório
git clone https://github.com/Jubz-Cherry/Hunters.doc.git
cd Hunters.doc

2️. Backend
cd Backend
npm install
npm start

3️. Frontend
npm install
npm start


Funcionalidades idealizadas para próximas versões:
- Autenticação com JWT
- Sistema de favoritos
- Perfis de usuário
- Deploy em ambiente cloud

Objetivo Técnico:
Este projeto foi desenvolvido para consolidar conhecimentos em:

- Desenvolvimento full-stack
- Criação e consumo de API REST
- Integração com banco NoSQL
- Organização de código em camadas
