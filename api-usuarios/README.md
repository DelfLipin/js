# API de Usuários com Node.js, Express e Knex

Este projeto implementa uma API RESTful para gerenciar usuários em um banco de dados MySQL, utilizando Node.js, Express e Knex.

## Estrutura do Projeto

```
api-usuarios/
├── .env                           # Variáveis de ambiente
├── knexfile.js                    # Configuração do Knex
├── package.json                   # Dependências e scripts
├── README.md                      # Este arquivo
└── src/
    ├── controllers/               # Controladores da API
    │   └── usuario.controller.js  # Controlador de usuários
    ├── database/                  # Arquivos relacionados ao banco de dados
    │   ├── connection.js          # Configuração da conexão com o banco
    │   ├── createDatabase.js      # Script para criar o banco de dados
    │   └── migrations/            # Migrations do Knex
    │       ├── 20250528000001_create_usuario_table.js
    │       └── 20250528000002_seed_usuarios_iniciais.js
    ├── index.js                   # Ponto de entrada da aplicação
    └── routes/                    # Rotas da API
        ├── index.js               # Arquivo central de rotas
        └── usuario.routes.js      # Rotas para o recurso "usuário"
```

## Instalação

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env` com suas credenciais de banco de dados
4. Crie o banco de dados:
   ```
   npm run create-db
   ```
5. Execute as migrations:
   ```
   npm run migrate
   ```

## Executando o Projeto

Para iniciar o servidor em modo desenvolvimento:
```
npm run dev
```

Para iniciar o servidor em modo produção:
```
npm start
```

## Endpoints da API

- `GET /api/usuarios`: Lista todos os usuários
- `GET /api/usuarios/:id`: Busca um usuário específico por ID
- `POST /api/usuarios`: Cria um novo usuário
- `PUT /api/usuarios/:id`: Atualiza um usuário existente
- `DELETE /api/usuarios/:id`: Exclui um usuário

## Exemplos de Uso

### Listar todos os usuários
```bash
curl -X GET http://localhost:3000/api/usuarios
```

### Buscar usuário por ID
```bash
curl -X GET http://localhost:3000/api/usuarios/1
```

### Criar novo usuário
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Pereira",
    "data_nascimento": "1988-07-12",
    "telefone": "(41) 98765-4321",
    "email": "ana.pereira@exemplo.com"
  }'
```

### Atualizar usuário
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 99999-8888",
    "email": "joao.silva@exemplo.com"
  }'
```

### Excluir usuário
```bash
curl -X DELETE http://localhost:3000/api/usuarios/1
```
