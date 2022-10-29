/*
 * Filename: books.js
 * Author: Naisarg Patel
 * Student #: 301215678
 * App name: COMP229-F2022-MidTerm-301215678
 * 
 */

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/details", {
    title: "Book list",
    books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  const {Title, Price, Author, Genre, Description} = req.body; // Fetching data from req.body

  const newBook = new book({
    Title,
    Price,
    Author,
    Genre,
    Description,
  });

  book.create(newBook, (err, book) => {
    if (err) res.end(err);
    else res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.findById(id, (err, bookToEdit) => {
    if (err) res.end(err);
    else {
      res.render("books/details", {
        title: "Book list",
        books: bookToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  const {Title, Price, Author, Genre, Description} = req.body; // Fetching data from req.body

  const updatedBook = new book({
    _id: id,
    Title,
    Price,
    Author,
    Genre,
    Description,
  });
  book.updateOne({_id: id}, updatedBook, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.deleteOne({_id: id}, (err) => {
    if (err) res.end(err);
    else res.redirect("/books");
  });
});

module.exports = router;
