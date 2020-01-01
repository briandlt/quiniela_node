const express = require('express');
const pug = require('pug');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const connect = require('./config/connection');
const { secretKey } = require('./config');

//Router
const appRouter = require('./routes/app');

// init app
const app = express();

// Sessions
const MongoStore = connectMongo(session);

// use mongo to store sessions
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
	mongooseConnection: connect,
	autoRemove: 'disabled',
	touchAfter: 24 * 3600, // Each 24 hoours update session
	ttl: 7 * 24 * 60 * 60 // After 7 days expires session
  })
}));


// Middellwers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// View engine
app.set('view engine', 'pug');

// static files
app.use(express.static('public'));

// Routes
app.use('/', appRouter);

// init server
app.listen(8080, () => console.log("Server on port 8080") );
