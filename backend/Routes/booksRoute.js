import express from "express";
import { Book } from "../Models.js";

const router = express.Router();

// Route for save the book
router.post("/", async (request, response) => {
  try {
    // if (!request.body.title || !request.body.author || !request.publishYear) {
    //   response.status(400).send({ message: "Invalid Data" });
    // }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    if (!books) {
      response.status(204).send({ message: "No Books found" });
    }
    response.status(200).json({ count: books.length, books });
  } catch (error) {
    response.status(201).send(error.message);
  }
});

// Route for get book by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const bookById = await Book.findById(id);
    if (!bookById) {
      response.status(201).send("no books were found");
    }

    response.status(200).json({ bookById });
  } catch (error) {
    console.log(error.message);
    response.status(2201).send("no books were found");
  }
});

// Route for update books by id
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      response.status(2011).send({ message: "Send all Required Data" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) response.status(201).send({ message: "No Books were found" });
    response.status(200).send({ message: "Book get updated" });
  } catch (error) {
    console.log(error.message);
    response.status(2051).send("no books were found");
  }
});

// Route for delete book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    response.status(200).send({ message: "Book has been deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(2051).send("no books were found");
  }
});

export default router;
