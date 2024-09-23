/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('EmailConfig', function (table) {
        table.increments('id').primary();
        table.string('smtpServer').notNullable();
        table.string('smtpPort').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
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
    await knex.schema.dropTable('EmailConfig');
}
