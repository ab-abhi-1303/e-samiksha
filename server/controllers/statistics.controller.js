const express = require('express');
const router = express.Router();

const statisticsService = require('../services/statistics.service.js');

router.get('/bestBooks', getBestBook); //best as in ratings
router.get('/lastBooks', getLastBooks); //recently added books
router.get('/mostPopularBooks', getMostPopular); //most commented
router.get('/getQuantityOfCategories', getQuantityOfCategories);
router.get('/getNumbers', getNumbers); //get every stat of every model in DB
router.get('/userActivity/:userId', getUserActivity); //get all activity of a user

//most rated books
function getBestBook(req, res) {
  statisticsService
    .getBestBooks(3)
    .then((books) => res.json(books))
    .catch((err) => res.json({ err }));
}
function getLastBooks(req, res) {
  statisticsService
    .getLastBooks(3)
    .then((books) => res.json(books))
    .catch(() => res.json({}));
}

function getMostPopular(req, res) {
  statisticsService
    .getMostPopularBooks(3)
    .then((books) => {
      res.json(books);
    })
    .catch(() => res.json({}));
}
function getQuantityOfCategories(req, res) {
  statisticsService
    .getQuantityOfCategories()
    .then((cat) => {
      res.json(cat);
    })
    .catch(() => res.json({}));
}
function getNumbers(req, res) {
  statisticsService
    .getNumbers()
    .then((books) => {
      res.json(books);
    })
    .catch(() => res.json({}));
}
function getUserActivity(req, res) {
  const { userId } = req.params;

  statisticsService
    .getUserActivity(userId)
    .then((cat) => {
      res.json(cat);
    })
    .catch(() => res.json({}));
}

module.exports = router;
