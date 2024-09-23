CRM Project

Requisitos

Certifique-se de ter o Node.js e o npm instalados no seu sistema.

Instalação

1. Clone o repositório:

   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>

2. Instale as dependências:

   npm install

3. Instale o Knex CLI globalmente (se ainda não estiver instalado):

   npm install -g knex

Configuração do Knex

O Knex requer um arquivo de configuração que define a conexão com o banco de dados. Normalmente, este arquivo é chamado knexfile.js. Exemplo:

// knexfile.js
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
};

Se você estiver usando ES modules, o arquivo pode ser knexfile.mjs:

// knexfile.mjs
export default {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
};

Criar uma Migração

Para criar uma nova migração, use o comando knex migrate:make seguido pelo nome da migração. Por exemplo, para criar uma migração chamada create_users_table:

knex migrate:make create_users_table

Isso criará um novo arquivo de migração na pasta migrations com um nome baseado no timestamp atual e no nome fornecido.

Editar uma Migração

Abra o arquivo de migração recém-criado na pasta migrations e defina a estrutura da sua tabela. Por exemplo:

// migrations/20230730123456_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

Rodar Migrações

Para aplicar as migrações e criar as tabelas no banco de dados, use o comando knex migrate:latest:

knex migrate:latest

Isso executará todas as migrações que ainda não foram aplicadas.

Reverter Migrações

Se precisar reverter a última migração aplicada, use o comando knex migrate:rollback:

knex migrate:rollback

Para reverter todas as migrações, você pode usar o comando várias vezes ou ajustar os comandos de acordo com a necessidade.

Configuração do Ambiente de Desenvolvimento

Certifique-se de que a configuração do banco de dados no arquivo knexfile.js ou knexfile.mjs está correta para o seu ambiente. Você pode ter diferentes configurações para desenvolvimento, teste e produção.

Exemplos Adicionais

- Criar uma migração de rollback:

  knex migrate:rollback --all

- Listar as migrações aplicadas:

  knex migrate:list

Documentação do Knex

Para mais detalhes e opções avançadas, consulte a documentação oficial do Knex (http://knexjs.org/).

```bash
npx knex migrate:latest
```
feji ykvd msgf urql
