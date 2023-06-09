/*********************************************************************************
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Mustafa Siddiqui Student ID: 117434225 Date: 2nd June, 2023
*
*  Online (Cyclic) URL: https://troubled-bull-turtleneck.cyclic.app/about
*
********************************************************************************/ 


const express    = require('express');
const storeService  = require('./store-service');

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
    storeService.getPublishedItems()
      .then((items) => {
        res.json(items);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  });
  
  app.get('/items', (req, res) => {
    storeService.getAllItems()
      .then((items) => {
        res.json(items);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  });
  
  app.get('/categories', (req, res) => {
    storeService.getCategories()
      .then((categories) => {
        res.json(categories);
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  });
  
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/views/404.html');

  });
  

storeService.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error initializing store service: ${error}`);
  });
