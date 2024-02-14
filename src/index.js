const express = require('express');
const path = require('path');
const morgan = require('morgan');
const engine = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const hbsHelpers = require('./helpers/hbs-helpers');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

// Teamplate engine
app.engine(
  'hbs',
  engine.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: hbsHelpers
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// HTTP logger
// app.use(morgan('combined'));

// Init route
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
