import { QueryRunner } from "typeorm";
import { Book } from "../entity/Book";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";

export class BooksController {
    async get(req: any, res: any) {
        try {
            const appDataSource = await AppDataSource();
            const bookRepository = appDataSource.getRepository(Book);
            const books = await bookRepository.find({
                relations: {
                    author: true,
                },
            });

            res.status(200).json({
                books: books,
            });
        } catch (error) {
            res.status(500).json({
                message:
                    "Something unexpected has happened. Please try again later.",
            });
        }
    }

    async create(req: any, res: any) {
        try {
            const { body } = req;
            const {
                title,
                description,
                releaseDate,
                pages,
                author: authorId,
            } = body;

            const appDataSource = await AppDataSource();
            const authorRepository = appDataSource.getRepository(Author);
            const author = await authorRepository.findOneBy({
                id: authorId,
            });

            if (author) {
                const book = new Book();
                book.title = title;
                book.releaseDate = new Date(releaseDate);
                book.description = description;
                book.pages = pages;
                book.author = author;
                book.createdAt = new Date();
                book.updatedAt = new Date();

                const bookRepository = appDataSource.getRepository(Book);
                const results = await bookRepository.save(book);

                if (results) {
                    const books = await bookRepository.find({
                        relations: {
                            author: true,
                        },
                    });

                    return res.status(200).json({
                        message: `Book ${results.title} created successfully!`,
                        books: books,
                    });
                }

                throw new Error("Failed to create book.");
            }

            throw new Error("Failed to create book. Author not found.");
        } catch (error) {
            res.status(500).json({
                message:
                    "Something unexpected has happened. Please try again later.",
            });
        }
    }

    async update(req: any, res: any) {
        try {
            const { params, body } = req;
            const { id } = params;
            const {
                title,
                description,
                releaseDate,
                pages,
                author: authorId,
            } = body;

            const appDataSource = await AppDataSource();
            const bookRepository = appDataSource.getRepository(Book);
            const book = await bookRepository.findOneBy({
                id: id,
            });

            if (book) {
                const authorRepository = appDataSource.getRepository(Author);
                const author = await authorRepository.findOneBy({
                    id: authorId,
                });

                if (author) {
                    book.title = title;
                    book.releaseDate = new Date(releaseDate);
                    book.description = description;
                    book.pages = pages;
                    book.author = author;
                    book.createdAt = new Date();
                    book.updatedAt = new Date();

                    const results = await bookRepository.save(book);

                    if (results) {
                        const books = await bookRepository.find({
                            relations: {
                                author: true,
                            },
                        });

                        return res.status(200).json({
                            message: `Book ${results.title} updated successfully!`,
                            books: books,
                        });
                    }

                    throw new Error("Failed to update book.");
                }

                throw new Error("Failed to update book. Author not found.");
            }

            throw new Error("Failed to update book. Book not found.");
        } catch (error) {
            res.status(500).json({
                message:
                    "Something unexpected has happened. Please try again later.",
            });
        }
    }

    async delete(req: any, res: any) {
        try {
            const { params } = req;
            const { id } = params;

            const appDataSource = await AppDataSource();
            const bookRepository = appDataSource.getRepository(Book);
            const book = await bookRepository.findOneBy({
                id: id,
            });

            if (book) {
                const results = await bookRepository.remove(book);

                if (results) {
                    const books = await bookRepository.find({
                        relations: {
                            author: true,
                        },
                    });

                    return res.status(200).json({
                        message: `Book ${results.title} deleted successfully!`,
                        books: books,
                    });
                }

                throw new Error("Failed to delete book.");
            }

            throw new Error("Failed to delete book.");
        } catch (error) {
            res.status(500).json({
                message:
                    "Something unexpected has happened. Please try again later.",
            });
        }
    }
}
