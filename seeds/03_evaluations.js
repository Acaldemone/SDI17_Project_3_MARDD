/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('evaluations').del()
  await knex('evaluations').insert([
    {
      work_performance: 5,
      work_performance_comments: 'Performed well in assigned tasks',
      followership_leadership: 4,
      followership_leadership_comments: 'Demonstrated strong leadership skills',
      professional_development: 4,
      professional_development_comments: 'Actively pursued professional growth opportunities',
      self_improvement: 5,
      self_improvement_comments: 'Showed willingness to improve skills',
      passing_fitness: true,
      fitness_comments: 'Met fitness requirements',
      last_eval_date: '2022-07-01',
      user_id: BigInt(1234567890),
    },
    {
      work_performance: 4,
      work_performance_comments: 'Performed well in assigned tasks',
      followership_leadership: 5,
      followership_leadership_comments: 'Demonstrated strong leadership skills',
      professional_development: 4,
      professional_development_comments: 'Actively pursued professional growth opportunities',
      self_improvement: 5,
      self_improvement_comments: 'Showed willingness to improve skills',
      passing_fitness: true,
      fitness_comments: 'Met fitness requirements',
      last_eval_date: '2022-07-01',
      user_id: BigInt(1234567891),
      supervisor_id: BigInt(1234567890)
    },
    {
      work_performance: 2,
      work_performance_comments: 'Did not perform well in assigned tasks',
      followership_leadership: 2,
      followership_leadership_comments: 'Demonstrated weak leadership skills',
      professional_development: 3,
      professional_development_comments: 'Required a push to pursue professional growth opportunities',
      self_improvement: 5,
      self_improvement_comments: 'Showed willingness to attend college courses',
      passing_fitness: false,
      fitness_comments: 'Did not meet fitness requirements',
      last_eval_date: '2022-07-01',
      user_id: BigInt(1234567892),
      supervisor_id: BigInt(1234567890)
    },
    {
      work_performance: 4,
      work_performance_comments: 'Performed well in assigned tasks',
      followership_leadership: 5,
      followership_leadership_comments: 'Demonstrated strong leadership skills',
      professional_development: 4,
      professional_development_comments: 'Actively pursued professional growth opportunities',
      self_improvement: 5,
      self_improvement_comments: 'Showed willingness to improve skills',
      passing_fitness: true,
      fitness_comments: 'Met fitness requirements',
      last_eval_date: '2022-07-01',
      user_id: BigInt(1234567893),
      supervisor_id: BigInt(1234567890)
    }
  ]);
};
