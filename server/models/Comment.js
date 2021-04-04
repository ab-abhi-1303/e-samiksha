const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    text: { type: String, required: true, minlength: 2, maxlength: 50 },
  },
  { timestamps: true },
);

const Comment = mongoose.model('Comment', CommentSchema, 'comments');

module.exports = Comment;
