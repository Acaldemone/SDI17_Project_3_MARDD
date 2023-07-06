/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('evaluations', table => {
    table.increments();
    table.integer('work_performance');
    table.string('work_performance_comments', 500);
    table.integer('followership/leadership');
    table.integer('followership/leadership_comments', 500);
    table.integer('professional_development');
    table.integer('professional_development_comments', 500);
    table.integer('self_improvement');
    table.string('self_improvement_comments', 500);
    table.boolean('passing_fitness');
    table.string('fitness_comments', 100)
    table.date('last_eval_date');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('supervisor_id');
    table.foreign('supervisor_id').references('users.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('evaluations', table => {
        table.dropForeign('user_id');
        table.dropForeign('supervisor_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('evaluations');
    });
};
