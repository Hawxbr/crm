/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('ClientCategorie', function(table) {
        table.increments('id').primary();
        table.integer('clientId').unsigned().notNullable().references('id').inTable('Client').onDelete('CASCADE');
        table.integer('categoryId').unsigned().notNullable().references('id').inTable('Categorie').onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('ClientCategorie');
}
