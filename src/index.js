const express = require('express');
const path = require('path');
const morgan = require('morgan');
const engine = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Teamplate engine
app.engine('hbs', engine.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
// HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
