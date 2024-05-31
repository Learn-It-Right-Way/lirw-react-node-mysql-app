import { QueryRunner } from "typeorm";
import { Author } from "../entity/Author";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export class AuthorsController {
    async get(req: any, res: any) {
        try {
            const appDataSource = await AppDataSource();
            const authorRepository = appDataSource.getRepository(Author);
            const authors = await authorRepository.find();

            res.status(200).json({
                authors: authors,
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
            const { name, birthday, bio } = body;

            const author = new Author();
            author.name = name;
            author.birthday = new Date(birthday);
            author.bio = bio;
            author.createdAt = new Date();
            author.updatedAt = new Date();

            const appDataSource = await AppDataSource();
            const authorRepository = appDataSource.getRepository(Author);
            const results = await authorRepository.save(author);

            if (results) {
                const authors = await authorRepository.find();

                return res.status(200).json({
                    message: `Author ${results.name} created successfully!`,
                    authors: authors,
                });
            }

            throw new Error("Failed to create author.");
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
            const { name, birthday, bio } = body;

            const appDataSource = await AppDataSource();
            const authorRepository = appDataSource.getRepository(Author);
            const author = await authorRepository.findOneBy({
                id: id,
            });

            if (author) {
                author.name = name;
                author.birthday = new Date(birthday);
                author.bio = bio;
                author.updatedAt = new Date();

                const results = await authorRepository.save(author);

                if (results) {
                    const authors = await authorRepository.find();

                    return res.status(200).json({
                        message: `Author ${results.name} updated successfully!`,
                        authors: authors,
                    });
                }

                throw new Error("Failed to update author.");
            }

            throw new Error("Failed to update author.");
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
            const authorRepository = appDataSource.getRepository(Author);
            const author = await authorRepository.findOneBy({
                id: id,
            });

            if (author) {
                const results = await authorRepository.remove(author);

                if (results) {
                    const authors = await authorRepository.find();

                    return res.status(200).json({
                        message: `Author ${results.name} deleted successfully!`,
                        authors: authors,
                    });
                }

                throw new Error("Failed to delete author.");
            }

            throw new Error("Failed to delete author.");
        } catch (error) {
            res.status(500).json({
                message:
                    "Something unexpected has happened. Please try again later.",
            });
        }
    }
}
