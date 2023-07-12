const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const https = require('https');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8080;

require('dotenv').config();

// const options = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
// };

app.use(express.json());
app.use(cors())
const knex = require('knex')(require('../../knexfile.js') ['development'])

// const server = https.createServer(options, app)

app.listen(port, () => {
  console.log('Your Knex and Express application are running successfully!')
})

app.get('/', (req, res) => {
  res.send('Application is running!')
})

app.get('/users/:id', async (request, response) => {
  const {id} = request.params
  try{
  const user = await knex('users')
    .select('*')
    .where('id', BigInt(id))
    response.json(user)
  }catch (err){
    console.log(err)
    response.status(500).json({message:"Error retrieving user data"})
  }
})

app.post('/register/createUser', async (req, res) => {
  const { id, last_name, first_name, email, password } = req.body;

  const hashedPass = await bcrypt.hashSync(password, 10)
  try {
    const newUser = {
      id: BigInt(id),
      last_name: last_name,
      first_name: first_name,
      email: email,
      password: hashedpass
    };

    const addedUser = await knex('users')
      .insert(newUser)
      .returning('*');

    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).json({ message: "Error adding new user" });
  }
});

app.patch('/users/:id', async (req, res) => {
  const {id} = req.params;
  const {last_name, first_name, email, last_eval_date, role_id, supervisor_id } = req.body;

  try{
    const userToUpdate = {}

    if (last_name) userToUpdate.last_name = last_name;
    if (first_name) userToUpdate.first_name = first_name;
    if (email) userToUpdate.email = email;
    if (last_eval_date) userToUpdate.last_eval_date = last_eval_date;
    if (role_id) userToUpdate.role_id = role_id;
    if (supervisor_id) userToUpdate.supervisor_id = supervisor_id;

  const updatedUser = await knex('users')
    .where({id})
    .update(userToUpdate)
    .returning("*");

    if (!updatedUser.length) {
    return res.status(404).json({message: 'User not found'})

    }
    res.status(200).json(updatedUser)
  }catch (err){
    res.status(500).json({ message: "Error updating user" });
  }
})

app.get('/users/evals/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const userEvals = await knex('users')
    .join("evaluations", "users.id", "=", "evaluations.user_id")
    .select("*")
    .where("users.id", BigInt(id))
    .orderBy('evaluations.id', 'desc')
    res.json(userEvals)
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Error retrieving user data"})
  }
})

app.get('/users/evals/latest/:id', async(req,res) => {
  const {id} = req.params;

  try{
    const latestEval = await knex('users')
    .join("evaluations", "users.id", "=", "evaluations.user_id")
    .select("*")
    .where("users.id", BigInt(id))
    .orderBy('evaluations.id', 'desc')
    .first()

    const evalHistory = await knex('evaluations')
    .select("id", "eval_date")
    .where("evaluations.user_id", BigInt(id))
    .orderBy("evaluations.id", 'desc')
    .offset(1)

    res.status(200).json({ latestEval, evalHistory });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});




app.get('/users/supervisor/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const supervisorInfo = await knex ('users')
    .select("*")
    .where('users.id', BigInt(id))
    res.status(201).json(supervisorInfo)
  }catch(err){
    res.status(500).json({message:"Error retrieving"})
  }
})

app.get('/users/troops/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const troopList = await knex ('users')
    .select("last_name", "first_name", "id")
    .where('users.supervisor_id', BigInt(id))
    res.status(201).json(troopList)
  }catch(err){
    res.status(500).json({message:"Error retrieving"})
  }
})

app.post('/users/evals', async (req, res) => {
  const {work_performance,
    work_performance_comments,
    followership_leadership,
    followership_leadership_comments,
    professional_development,
    professional_development_comments,
    self_improvement,
    self_improvement_comments,
    passing_fitness,
    fitness_comments,
    eval_date,
    user_id,
    supervisor_id} = req.body;

    try{
      const newEval = {
        work_performance: work_performance,
        work_performance_comments: work_performance_comments,
        followership_leadership: followership_leadership,
        followership_leadership_comments: followership_leadership_comments,
        professional_development: professional_development,
        professional_development_comments: professional_development_comments,
        self_improvement: self_improvement,
        self_improvement_comments: self_improvement_comments,
        passing_fitness: passing_fitness,
        fitness_comments: fitness_comments,
        eval_date: eval_date,
        user_id: BigInt(user_id),
        supervisor_id: BigInt(supervisor_id)
      };

      const addedEval = await knex ('evaluations')
        .insert(newEval)
        .returning('*');
        res.status(201).json(addedEval);
    }catch(err){res.status(500).json({message:"Error adding eval"})}
});

app.patch('/users/evals/:id', async (req, res) => {
  const {id} = req.params;
  const {work_performance,
    work_performance_comments,
    followership_leadership,
    followership_leadership_comments,
    professional_development,
    professional_development_comments,
    self_improvement,
    self_improvement_comments,
    passing_fitness,
    fitness_comments,
    eval_date,
    supervisor_id} = req.body;

  try {
    const evalToUpdate = {}

    if (work_performance) evalToUpdate.work_performance = work_performance;
    if (work_performance) evalToUpdate.work_performance_comments = work_performance_comments;
    if (followership_leadership) evalToUpdate.followership_leadership = followership_leadership;
    if (followership_leadership_comments) evalToUpdate.followership_leadership_comments = followership_leadership_comments;
    if (professional_development) evalToUpdate.professional_development = professional_development;
    if (professional_development_comments) evalToUpdate.professional_development_comments = professional_development_comments;
    if (self_improvement) evalToUpdate.self_improvement = self_improvement;
    if (self_improvement_comments) evalToUpdate.self_improvement_comments = self_improvement_comments;
    if (passing_fitness) evalToUpdate.passing_fitness = passing_fitness;
    if (fitness_comments) evalToUpdate.fitness_comments = fitness_comments;
    if (eval_date) evalToUpdate.last_eval_date = eval_date;
    if (supervisor_id) evalToUpdate.supervisor_id = supervisor_id;

    const updatedEval = await knex('evaluations')
    .where('user_id', id)
    .update(evalToUpdate)
    .returning("*");

    if (!updatedEval.length) {
    return res.status(404).json({message: 'Evaluation not found'})

    }
    res.status(200).json(updatedEval)
  }catch (err){
    res.status(500).json({ message: "Error updating evaluation" });
  }
})

app.post('/login/validation', async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await knex('users')
      .select('id', 'email', 'password')
      .where('email', email)
      .first();

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
        res.status(201).json({ id: user.id, token: token });
      } else {
        res.status(401).json({ id: '' });
      }
    } else {
      res.status(401).json({ id: '' });
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    res.status(500).json({ message: 'Error validating credentials' });
  }
});

// app.delete (STRETCH GOAL for adding an adminstrator role)

