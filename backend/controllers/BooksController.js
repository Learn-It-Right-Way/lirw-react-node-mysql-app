const db = require('../configs/db');
const logger = require('../utils/logger'); // Import logger

function BooksController() { }

const getQuery = `SELECT b.id as id, b.title as title, b.releaseDate as releaseDate, b.description as description, b.pages as pages,
 b.createdAt as createdAt, b.updatedAt as updatedAt, a.id as authorId, a.name as name, a.birthday as birthday, a.bio as bio FROM book b INNER JOIN author a on b.authorId = a.id`;

BooksController.prototype.get = async (req, res) => {
   try {
      logger.info('BooksController [GET]');

      db.query(getQuery, (err, books) => {
         if (err) {
            logger.error(`Error executing query: ${err.message}`);
            throw new Error("Error executing query.");
         }

         logger.info(`Books count: ${books.length}`);

         res.status(200).json({
            books: books,
         });
      });
   } catch (error) {
      logger.error(`Error: ${error.message}`);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

BooksController.prototype.create = async (req, res) => {
   try {
      const {
         title,
         description,
         releaseDate,
         pages,
         author: authorId,
      } = req.body;

      logger.info(`BooksController [CREATE] - title: ${title}, description: ${description}, releaseDate: ${releaseDate}, pages: ${pages}, authorId: ${authorId}`);

      db.query('INSERT INTO book (title, releaseDate, description, pages, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)', [
         title, new Date(releaseDate), description, pages, authorId, new Date(), new Date()], (err) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.", err);
            }

            db.query(getQuery, (err, books) => {
               if (err) {
                  logger.error(`Error executing query: ${err.message}`);
                  throw new Error("Error executing query.");
               }

               logger.info(`Book created successfully. books count: ${books.length}`);

               return res.status(200).json({
                  message: `Book created successfully!`,
                  books: books,
               });
            });
         });
   } catch (error) {
      logger.error(`Error: ${error.message}`);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

BooksController.prototype.update = async (req, res) => {
   try {
      const bookId = req.params.id;
      const {
         title,
         description,
         releaseDate,
         pages,
         author: authorId,
      } = req.body;

      logger.info(`BooksController [UPDATE] - title: ${title}, description: ${description}, releaseDate: ${releaseDate}, pages: ${pages}, authorId: ${authorId}`);
   
      db.query('UPDATE book SET title = ?, releaseDate = ?, description = ?, pages = ?, authorId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [
         title, new Date(releaseDate), description, pages, authorId, bookId], (err) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, books) => {
               if (err) {
                  logger.error(`Error executing query: ${err.message}`);
                  throw new Error("Error executing query.");
               }

               logger.info(`Book updated successfully. books count: ${books.length}`);
      
               return res.status(200).json({
                  message: `Book updated successfully!`,
                  books: books,
               });
            });
         });
   } catch (error) {
      logger.error(`Error: ${error.message}`);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

BooksController.prototype.delete = async (req, res) => {
   try {
      const bookId = req.params.id;

      logger.info(`BooksController [DELETE] - bookId: ${bookId}`);

      db.query('DELETE FROM book WHERE id = ?', [bookId], (err) => {
         if (err) {
            logger.error(`Error executing query: ${err.message}`);
            throw new Error("Error executing query.");
         }

         db.query(getQuery, (err, books) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.");
            }

            logger.info(`Book deleted successfully. books count: ${books.length}`);

            return res.status(200).json({
               message: `Book deleted successfully!`,
               books: books,
            });
         });
      });
   } catch (error) {
      logger.error(`Error: ${error.message}`);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

module.exports = new BooksController();