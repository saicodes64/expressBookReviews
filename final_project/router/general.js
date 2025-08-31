const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let {username} = req.body

  return isValid(username);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 let ans =  bookList()
  res.json(ans);
});

let bookList = () => {
  return Object.values(books).map(book => ({
    title : book.title,
    author : book.author
  })) 
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  try {
    let isbn = req.params.isbn;
    console.log(isbn);

    let book = isbnList(isbn)
    res.send(book);
  } catch (error) {
    return res.status(300).json({error});
  }
  
 });

 let isbnList = (isbn) => {
   if(books[isbn]){
    return books[isbn];
   }
   return null;
 }
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  
  author = getAuthor(author)
  res.send(author)
});

const getAuthor = (auth) => {
  return Object.values(books).filter(book => book.author === auth)
  }

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  title = getTitle(title);

  res.send(title);
});

const getTitle = (title) => {
  return Object.values(books).filter(book => book.title === title)
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let reviews = getReview(isbn)

  res.send(reviews)
});

const getReview = (isbn) => {
  if(books[isbn]){
    return books[isbn].reviews;
  }
  return null;
}

module.exports.general = public_users;
