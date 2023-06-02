const express   = require('express');
const storeUtil = require('./store-service');
const items = require('./data/items.json');
const categories = require('./data/categories.json');


const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.get('/shop', (req, res) => {
    const publishedItems = items.filter(item => item.published);
    res.json(publishedItems);
  });
  
  app.get('/items', (req, res) => {
    res.json(items);
  });
  
  app.get('/categories', (req, res) => {
    res.json(categories);
  });
  
  app.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });
  

app.listen(port, () => {
  console.log(`Express http server listening on port ${port}`);
});
