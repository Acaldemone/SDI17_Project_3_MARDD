const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Application is running!')
})

app.listen(port, () => {
  console.log('Your Knex and Express application are running successfully!')
})