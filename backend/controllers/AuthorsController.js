const db = require('../configs/db');
const logger = require('../utils/logger'); // Import logger

function AuthorsController() { }

const getQuery = 'SELECT * FROM author';

AuthorsController.prototype.get = async (req, res) => {
   try {
      logger.info('AuthorsController [GET]');

      db.query(getQuery, (err, authors) => {
         if (err) {
            logger.error(`Error executing query: ${err.message}`);
            throw new Error("Error executing query.");
         }

         logger.info(`Authors count: ${authors.length}`);

         res.status(200).json({
            authors: authors,
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

AuthorsController.prototype.create = async (req, res) => {
   try {
      const { name, birthday, bio } = req.body;

      logger.info(`AuthorsController [CREATE] - name: ${name}, birthday: ${birthday}, bio: ${bio}`);

      db.query('INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [
         name, new Date(birthday), bio], (err) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  logger.error(`Error executing query: ${err.message}`);
                  throw new Error("Error executing query.");
               }

               logger.info(`Author created successfully. authors count: ${authors.length}`);

               return res.status(200).json({
                  message: `Author created successfully!`,
                  authors: authors,
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

AuthorsController.prototype.update = async (req, res) => {
   try {
      const authorId = req.params.id;
      const { name, birthday, bio } = req.body;

      logger.info(`AuthorsController [UPDATE] - authorId: ${authorId}, name: ${name}, birthday: ${birthday}, bio: ${bio}`);

      db.query(`UPDATE author SET name = ?, birthday = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`, [
         name, new Date(birthday), bio, authorId], (err) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  logger.error(`Error executing query: ${err.message}`);
                  throw new Error("Error executing query.");
               }

               logger.info(`Author updated successfully. authors count: ${authors.length}`);

               return res.status(200).json({
                  message: `Author updated successfully!`,
                  authors: authors,
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

AuthorsController.prototype.delete = async (req, res) => {
   try {
      const authorId = req.params.id;

      logger.info(`AuthorsController [DELETE] - authorId: ${authorId}`);

      db.query('DELETE FROM author WHERE id = ?', [authorId], (err, result) => {
         if (err) {
            logger.error(`Error executing query: ${err.message}`);
            throw new Error("Error executing query.");
         }

         db.query(getQuery, (err, authors) => {
            if (err) {
               logger.error(`Error executing query: ${err.message}`);
               throw new Error("Error executing query.");
            }

            logger.info(`Author deleted successfully. authors count: ${authors.length}`);

            return res.status(200).json({
               message: `Author deleted successfully!`,
               authors: authors,
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

module.exports = new AuthorsController();