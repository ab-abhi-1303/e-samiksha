const mongoose = require('mongoose');
const isObjectIDvalid = mongoose.Types.ObjectId.isValid;

const db = require('../_helpers/db');
const BookRating = db.BookRating;

//give rating to a book
async function set({ bookId, value }, userId) {
  if (!isObjectIDvalid(bookId)) throw new Error('CommentID is not valid!');

  const ratingInDatabase = await BookRating.findOne({
    userId,
    bookId,
  });

  if (ratingInDatabase) {
    ratingInDatabase.value = value;
    ratingInDatabase.save(function (err, obj) {
      if (err) throw new Error('err.message');
      return;
    });
  } else {
    const commentRating = new BookRating({ userId, bookId, value });
    commentRating.save();
  }
}

//get average rating of a particular book
async function getAverageRate(bookId) {
  if (!isObjectIDvalid(bookId)) throw new Error('CommentID is not valid!');

  const bookRatings = await ratingsByBookId(bookId);
  if (!bookRatings.length) return { value: 0 };

  const value = (
    bookRatings.reduce((acc, { value }) => {
      return acc + value;
    }, 0) / bookRatings.length
  ).toFixed(2);

  //quantity below determines the number of users who have given rating to that book
  return { value, quantity: bookRatings.length };
}

//has user rated the book, if yes return value
async function userRateToBook(bookId, userId) {
  if (!isObjectIDvalid(bookId)) throw newError('CommentID is not valid!');

  const bookRating = await BookRating.findOne({
    userId,
    bookId,
  });

  if (bookRating)
    return {
      value: bookRating.value,
      isFound: true,
    };
  return { isFound: false };
}

//get ratings of all books by _id
async function ratingsByBookId(bookId) {
  return await BookRating.find({
    bookId,
  });
}

//get all books
async function getAll() {
  return await BookRating.find({});
}

async function findQuery(query) {
  return await BookRating.find(query);
}

module.exports = {
  set,
  getAverageRate,
  ratingsByBookId,
  userRateToBook,
  getAll,
  findQuery,
};
