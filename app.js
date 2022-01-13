const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 2000;

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
  res.send('Está funcionando 2');
});

//jobs router
app.use('/jobs', require('./routes/jobs'));
