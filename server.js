require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const { title } = require('process');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// arquivos estáticos
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

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

app.get('/registerfilial', (req, res) => {
  res.render('registerfilialpage', { title: 'Registro Filial'})
})

app.get('/home', (req, res) => {
  res.render('homepage', { title: 'Home Page' });
});

app.get('/predict', (req, res) => {
  res.render('predictpage', { title: 'Nova análise' });
});

app.get('/history', (req, res) => {
  res.render('historypage', { title: 'Histórico' });
});

app.get('/list', (req,res) => {
  res.render('companylistpage', { title: 'Lista de Filiais'})
})

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});