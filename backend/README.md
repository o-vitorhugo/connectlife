# Connect Life - API Node.js

API REST em **Node.js** com **Express** e **MySQL** usando **Sequelize**.

---

## Estrutura do Projeto

```
src/
├─ controllers/
├─ routes/
├─ services/
├─ models/
├─ config/
├─ middlewares/
└─ index.js
```

---

## Tecnologias

* Node.js
* Express
* Sequelize
* MySQL
* dotenv
* cors
* morgan

---

## Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd connect-life
```

2. Instale dependências:

```bash
npm install
```

3. Configure o `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=connectlife
DB_PORT=3306
```

4. Crie o banco MySQL com o mesmo nome de `DB_NAME`.

---

## Rodando a API

```bash
npm run dev    # modo desenvolvimento
npm start      # modo produção
```

A API estará disponível em: `http://localhost:3000/`

---

## Rotas de exemplo

* Listar usuários: `GET /api/users`
* Criar usuário: `POST /api/users`

```json
{
  "name": "Thiago",
  "email": "thiago@example.com"
}
```

---

## Observações

* Ignorar `node_modules` e `.env` no Git
* `sequelize.sync()` pode criar tabelas automaticamente
