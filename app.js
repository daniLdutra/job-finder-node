const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');

const PORT = 3500;

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

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
  Job.findAll({ order: [['createdAt', 'DESC']] }).then((jobs) => {
    res.render('index', {
      jobs,
    });
  });
});

//jobs router
app.use('/jobs', require('./routes/jobs'));
