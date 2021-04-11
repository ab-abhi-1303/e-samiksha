const express = require('express');
const router = express.Router();

const commentsRatingService = require('../services/commentsRating.service.js');

router.post('/', setRating);
router.get('/:commentId', getRating);
router.get('/user/:commentId', getUserRate);

//set rating of a comment by a user
async function setRating(req, res) {
  const userId = req.user.sub;

  commentsRatingService
    .setUserRating(req.body, userId)
    .then(() => res.json({ message: res.message, isSaved: true }))
    .catch((err) => res.json({ message: err.message, isSaved: false }));
}

//get rating of a comment
async function getRating(req, res) {
  const { commentId } = req.params;

  commentsRatingService
    .getCommentRating(commentId)
    .then((value) => res.json(value))
    .catch((err) => res.json({ message: err.message }));
}

//get rating of comment by user
async function getUserRate(req, res) {
  const { commentId } = req.params;
  const userId = req.user.sub;

  commentsRatingService
    .getUserCommentRating(commentId, userId)
    .then((value) => res.json(value))
    .catch((err) => res.json({ message: err.message }));
}

module.exports = router;
