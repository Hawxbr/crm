/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('Campaign', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.enum('type', ['email', 'sms', 'whatsapp']).notNullable();
        table.integer('category_id').unsigned().references('id').inTable('Categorie');
        table.integer('layout_id').unsigned().references('id').inTable('EmailLayout');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.integer('deleted').defaultTo(0);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('Campaign');
}
