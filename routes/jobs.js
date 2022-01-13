const express = require('express');
const Job = require('../models/Job');
const router = express.Router();
const job = require('../models/Job');

//rota de teste
router.get('/test', (req, res) => {
  res.send('deu certo!!!');
});

router.post('/add', (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body;

  Job.create({
    title,
    salary,
    company,
    description,
    email,
    new_job,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
