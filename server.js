require('dotenv').config();
const cors = require('cors');
const express = require('express');
const request = require('request');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// arquivos estáticos
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// const corsOptions = {
//   origin: 'https://wardecision.vercel.app',
//   optionsSuccessStatus: 200 
// };


// sessões
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

// cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  const data = { title: 'Página Inicial', content: 'Bem-vindo ao nosso site!' };
  res.render('loginpage', data);
});

app.get('/register', (req, res) => {
  res.render('registerpage', { title: 'Registro' });
});

app.get('/home', (req, res) => {
  res.render('homepage', { title: 'Registro' });
});

app.get('/predict', (req, res) => {
  res.render('predictpage', { title: 'Nova análise' });
});

app.get('/history', (req, res) => {
  res.render('historypage', { title: 'Histórico' });
});

// Proxy para a API do Azure
app.post('/proxy', (req, res) => {
  const apiURL = 'http://8541538b-c296-4900-b21a-975667d6b551.brazilsouth.azurecontainer.io/score';

  // Fazendo a requisição à API externa
  const options = {
      url: apiURL,
      method: 'POST',
      json: req.body, // O corpo da requisição é passado diretamente
      headers: {
          'Content-Type': 'application/json'
      }
  };

  // Faz a requisição e redireciona a resposta para o cliente
  request(options, (error, response, body) => {
      if (error) {
          return res.status(500).send({ error: 'Erro ao acessar a API' });
      }
      res.status(response.statusCode).send(body); // Envia a resposta da API de volta para o cliente
  });
});

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});