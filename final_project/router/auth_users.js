const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username" : "sai23", "password" : "Sai123"}];

const isValid = (username) => !users.some(user => user.username === username)

const authenticatedUser = (username,password)=>{ 
  return users.some(user => user.username === username && user.password === password)
}

//only registered users can login
regd_users.post("/login", (req,res) => {
   let {username,password} = req.body;
   let result = authenticatedUser(username, password)

   if(result){
    let token = jwt.sign({username}, process.env.JWT_KEY)
    res.cookie("token", token)
    req.session.authorization = {username}
    console.log(req.session.authorization.username)
    res.send("Login Successful! - Assigned Cookie")
   } else {
     res.send("Please register first")
   }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const {username, review} = req.body;

  if(books[isbn]){
    books[isbn].reviews[username] = {review}
    console.log(books[isbn].reviews)
    res.send("Your review has been added successfully!")
  } else {
    res.status(400).json({message : "Book with this ISBN does not exist"})
  }
});

regd_users.delete("/auth/review/:isbn", (req,res)=> {
  const isbn = req.params.isbn;
  let {username} = req.body

  if(books[isbn]){
    console.log(books[isbn].reviews)

    if(books[isbn].reviews[username]) {
      delete books[isbn].reviews[username]
    console.log(books[isbn].reviews)
    res.send("Your review has been deleted!")
    } else {
      res.send("Your review does not exist!")
    }
  } else {
    res.status(404).json({message : "Book with this ISBN does not exist"})
  }
})

regd_users.get("/logout", (req,res) => {
  let token = ""
  res.cookie("token", token)
  res.send("You are logged out!")
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
