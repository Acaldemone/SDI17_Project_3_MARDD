/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.bigint('id').primary();
        table.string('last_name');
        table.string('first_name');
        table.string('email');
        table.date('last_eval_date');
        table.text('password');
        table.integer('role_id');
        table.foreign('role_id').references('roles.id');
        // table.integer('supervisor_id');
        // table.foreign('supervisor_id').references('user.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropForeign('role_id');
    // table.dropForeign('supervisor_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('users');
    });
};
