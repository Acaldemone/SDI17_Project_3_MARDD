/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: BigInt(1234567890), last_name: 'Smitty', first_name:'James',email:'james.smitty@spaceforce.mil', role_id: 2, last_eval_date:'2023-07-07'},
    {id: BigInt(1234567891), last_name: 'Thompson', first_name:'Robert', email: 'robert.thompson@spaceforce.mil', role_id: 1, last_eval_date:'2022-10-22', supervisor_id: BigInt(1234567890)},
    {id: BigInt(1234567892), last_name: 'Nolan', first_name:'John', email: 'john.nolan@spaceforce.mil', role_id: 1, last_eval_date:'2022-07-10', supervisor_id: BigInt(1234567890)},
    {id: BigInt(1234567893), last_name: 'Lopez', first_name:'Angela', email: 'angela.lopez.2@spaceforce.mil', role_id: 1, last_eval_date:'2022-07-07', supervisor_id: BigInt(1234567890)}
  ]);
};
