# Marginalia

## Sobre o projeto

Marginalia é uma plataforma de interação entre leitores. Os usuários acesam livros e textos, selecionam trechos, e podem:

- Deixar anotações públicas sobre aquele trecho, visíveis para outros leitores
- Fazer perguntas a uma IA sobre o trecho selecionado (contexto delimitado, não o livro inteiro)
- Ver as respostas mais perguntadas pela comunidade viraram anotações públicas, com destaque


## Stacks utilizadas

**Frontend**
- React
- CSS / componentes próprios

**Backend**
- Node.js
- Express
- Arquitetura MVC (models, controllers, routes, services)

**Banco de dados**
- MariaDB

**Integrações**
- API para as respostas de IA sobre os trechos selecionados

## Estrutura do projeto

```
Back/
├── src/
│   ├── middlewares/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
└── server.js

Front/
└── src/
    ├── components/
    ├── hooks/
    ├── pages/
    └── App.jsx
```
