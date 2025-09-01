const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let {username, password} = req.body;
let result = isValid(username)
  if(result){
    users.push({username, password})
    res.send("Registration successful!")
  } else {
    res.send("Username is already taken!")
  }
});

public_users.get('/', async function(req, res) {
 let ans = await bookList()
  res.json(ans);
});

let bookList = () => {
  return Object.values(books).map(book => ({
    title : book.title,
    author : book.author
  })) 
}

public_users.get('/isbn/:isbn',async function (req, res) {
  try {
    let isbn = req.params.isbn;
    console.log(isbn);

    let book = await isbnList(isbn)
    res.json(book);
  } catch (error) {
    return res.status(400).json({error});
  }
  
 });

 let isbnList = (isbn) => {
  return new Promise(function(resolve,reject){
    if(books[isbn]){
      resolve(books[isbn]);
     }
     reject("Book not found!");
  })
 }
  
public_users.get('/author/:author',async function (req, res) {
  try{
    let author = req.params.author;
  
  author = await getAuthor(author)
  res.send(author)
  } catch (error){
    res.status(400).json({error})
  }
  
});

const getAuthor = (auth) => {
  return new Promise(function(resolve,reject){
    let result = (Object.values(books).filter(book => book.author === auth))

    if(result.length > 0) resolve(result);
    else reject("Wrong author brdr!")
  })
  }

public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  title = getTitle(title);

  res.send(title);
});

const getTitle = (title) => {
  return Object.values(books).filter(book => book.title === title)
}

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
