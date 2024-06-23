export interface Book {
    id: number;
    title: string;
    releaseDate: string;
    description: string;
    pages: number;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    name: string;
    birthday: string;
    bio: string;
}

export interface BookDTO {
    id: number;
    title: string;
    releaseDate: string;
    description: string;
    pages: number;
    createdAt: string;
    updatedAt: string;
    author: string
}

export interface BookFormDTO {
    id: number;
    title: string;
    releaseDate: string;
    description: string;
    pages: number;
    createdAt: string;
    updatedAt: string;
    author?: number
}