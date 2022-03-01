const express = require('express');
const app = express();
const db = require('../db/connection');
const bodyParser = require('body-parser');

const PORT = 3500;

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//db connection
db.authenticate()
  .then(() => {
    console.log('Conectou com o banco com sucesso');
  })
  .catch((err) => {
    console.log('Ocorreu um erro ao conectar', err);
  });

//router
app.get('/', (req, res) => {
  res.send('Está funcionandooooo');
});

//jobs router
app.use('/jobs', require('./jobs'));
