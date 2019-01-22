require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const port = 3000;
const pg = require('pg');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/users-controller');
const itemsController = require('./controllers/items-controller');
const messagingController = require('./controllers/messaging-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-TypeError, Accept');
  next();
});


/* GET REQUESTS */

app.get('/user/:email', (req, res, err) => {
  // joins user table and item table
  res.status(200);
});

app.get('/item/:id', itemsController.getOneItem, (req, res, err) => {
  res.status(200).json(res.locals.oneItem);
});

app.get('/search/:item_name', itemsController.searchItem, (req, res, err) => {
  res.status(200).json(res.locals.search);
});

app.get('/category/:category', itemsController.searchCategory, (req, res, err) => {
  res.status(200).json(res.locals.category);
});

app.get('/allItems', itemsController.getAllItems, (req, res, err) => {
  res.status(200).json(res.locals.items);
});

app.get('/convos/:userId', messagingController.getConvos, (req, res, err) => {
  res.status(200).json(res.locals.convos);
});

app.get('/messages/:convoId', messagingController.getMessages, (req, res, err) => {
  res.status(200).json(res.locals.messages);
});

/* POST REQUESTS */

app.post('/addUser', userController.addUser, (req, res, err) => {
  res.status(200).json(res.locals.data);
});

app.post('/addItem', itemsController.addItem, (req, res, err) => {
  res.status(200).json(res.locals.data);
});

app.post('/addConvo', messagingController.createConvo, (req, res, err) => {
  res.status(200).json(res.locals.convo)
});

app.post('/addMessage', messagingController.createMessage, (req, res, err) => {
  res.status(200).json(res.locals.message);
});



/* DELETE REQUESTS */

app.delete('/deleteItem', (req, res, err) => {
  // deletes item from database
  res.status(200);
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(port, () => console.log(`Listening on port ${port}`));
