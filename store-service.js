const fs = require("fs");

let items = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/items.json', 'utf8', (err, itemData) => {
      if (err) {
        reject("Unable to read items file");
      } else {
        try {
          items = JSON.parse(itemData);
          fs.readFile('./data/categories.json', 'utf8', (err, categoryData) => {
            if (err) {
              reject("Unable to read categories file");
            } else {
              try {
                categories = JSON.parse(categoryData);
                resolve();
              } catch (error) {
                reject("Unable to parse categories data");
              }
            }
          });
        } catch (error) {
          reject("Unable to parse items data");
        }
      }
    });
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      reject("No items found");
    } else {
      resolve(items);
    }
  });
}

function getPublishedItems() {
  return new Promise((resolve, reject) => {
    const publishedItems = items.filter((item) => item.published === true);
    if (publishedItems.length === 0) {
      reject("No published items found");
    } else {
      resolve(publishedItems);
    }
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("No categories found");
    } else {
      resolve(categories);
    }
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories,
};
