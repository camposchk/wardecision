require('dotenv').config();
const cors = require('cors');
const express = require('express');
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

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});