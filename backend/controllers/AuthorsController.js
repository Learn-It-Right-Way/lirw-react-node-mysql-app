const db = require('../configs/db');

function AuthorsController() { }

const getQuery = 'SELECT * FROM author';

AuthorsController.prototype.get = async (req, res) => {
   try {
      db.query(getQuery, (err, authors) => {
         if (err) {
            throw new Error("Error executing query.");
         }

         res.status(200).json({
            authors: authors,
         });
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

AuthorsController.prototype.create = async (req, res) => {
   try {
      const { name, birthday, bio } = req.body;

      db.query('INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [
         name, new Date(birthday), bio], (err) => {
            if (err) {
               console.log(err);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  throw new Error("Error executing query.");
               }

               return res.status(200).json({
                  message: `Author created successfully!`,
                  authors: authors,
               });
            });
         });
   } catch (error) {
      console.error(error);
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

      db.query(`UPDATE author SET name = ?, birthday = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`, [
         name, new Date(birthday), bio, authorId], (err) => {
            if (err) {
               console.log(err);
               throw new Error("Error executing query.");
            }

            db.query(getQuery, (err, authors) => {
               if (err) {
                  throw new Error("Error executing query.");
               }

               return res.status(200).json({
                  message: `Author updated successfully!`,
                  authors: authors,
               });
            });
         });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

AuthorsController.prototype.delete = async (req, res) => {
   try {
      const authorId = req.params.id;

      db.query('DELETE FROM author WHERE id = ?', [authorId], (err, result) => {
         if (err) {
            throw new Error("Error executing query.");
         }

         db.query(getQuery, (err, authors) => {
            if (err) {
               throw new Error("Error executing query.");
            }

            return res.status(200).json({
               message: `Author deleted successfully!`,
               authors: authors,
            });
         });
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         message:
            "Something unexpected has happened. Please try again later.",
      });
   }
};

module.exports = new AuthorsController();