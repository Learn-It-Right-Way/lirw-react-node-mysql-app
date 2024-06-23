import { Alert, Button, Table } from 'antd'
import './App.css'
import { useEffect, useState } from 'react'
import { IconEdit } from './components/IconEdit';
import { IconDelete } from './components/IconDelete';
import { IconView } from './components/IconView';
import { Link } from 'react-router-dom';
import { AddEditBookModal } from './components/AddEditBookModal';
import { ViewBookModal } from './components/ViewBookModal';
import { DeleteBookModal } from './components/DeleteBookModal';
import { Book, BookDTO, BookFormDTO } from './models/Books';
import { Author } from './models/Author';
const API_URL = import.meta.env.VITE_API_URL;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Updated Date',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
];

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [dataSource, setDataSource] = useState<BookDTO[]>([]);
  const [activeBook, setActiveBook] = useState<Book>();
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, [])

  useEffect(() => {
    formatBooksForDisplay(books);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books])

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      const { books, message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      setBooks(books);
    } catch (error) {
      console.log(error);

      setMessage((error as Error).message);
      setIsErrorAlertVisible(true);

      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 5000);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${API_URL}/authors`);
      const { authors, message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      setAuthors(authors);
    } catch (error) {
      console.log(error);

      setMessage((error as Error).message);
      setIsErrorAlertVisible(true);

      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 5000);
    }
  };

  const editBook = async (book: BookFormDTO) => {
    try {
      if (activeBook) {
        const response = await fetch(`${API_URL}/books/${activeBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });

        const { message, books } = await response.json();

        if (!response.ok) {
          throw new Error(message);
        }

        setBooks(books);
        setMessage(message);
        setIsSuccessAlertVisible(true);

        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);

      setMessage((error as Error).message);
      setIsErrorAlertVisible(true);

      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 5000);
    }
  }

  const addBook = async (book: BookFormDTO) => {
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      const { message, books } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      setBooks(books);
      setMessage(message);
      setIsSuccessAlertVisible(true);

      setTimeout(() => {
        setIsSuccessAlertVisible(false);
      }, 5000);
    } catch (error) {
      console.error(error);

      setMessage((error as Error).message);
      setIsErrorAlertVisible(true);

      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 5000);
    }
  }

  const bookAddEdit = (book: BookFormDTO) => {
    if (isEdit) {
      editBook(book);
      return;
    }

    addBook(book);
  }

  const bookDelete = async () => {
    try {
      if (activeBook) {
        const response = await fetch(`${API_URL}/books/${activeBook.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const { message, books } = await response.json();

        if (!response.ok) {
          throw new Error(message);
        }

        setBooks(books);
        setMessage(message);
        setIsSuccessAlertVisible(true);

        setTimeout(() => {
          setIsSuccessAlertVisible(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);

      setMessage((error as Error).message);
      setIsErrorAlertVisible(true);

      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 5000);
    }
  }

  const handleBookAdd = () => {
    setActiveBook(undefined);
    setIsEdit(false);
    setIsAddEditModalOpen(true);
  }

  const handleBookEdit = (book: Book) => {
    setActiveBook(book);
    setIsEdit(true);
    setIsAddEditModalOpen(true);
  }

  const handleBookView = (book: Book) => {
    setActiveBook(book);
    setIsViewModalOpen(true);
  }

  const handleBookDelete = (book: Book) => {
    setActiveBook(book);
    setIsDeleteModalOpen(true);
  }

  const formatBooksForDisplay = (books: Book[]) => {
    if (books.length > 0) {
      const dataSource: BookDTO[] = [];

      for (const book of books) {
        const bookObj = {
          key: book.id,
          id: book.id,
          title: book.title,
          releaseDate: book.releaseDate,
          description: book.description,
          pages: book.pages,
          author: book?.name,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
          actions: (
            <div className='flex space-x-4'>
              <Button icon={<IconEdit />} onClick={() => handleBookEdit(book)} />
              <Button type='primary' icon={<IconView />} onClick={() => handleBookView(book)} />
              <Button type='primary' icon={<IconDelete />} danger onClick={() => handleBookDelete(book)} />
            </div>
          )
        }

        dataSource.push(bookObj);
      }

      setDataSource(dataSource);
    }
  }

  return (
    <div className='h-screen font-mono p-4'>
      <header className='relative py-2 border-b'>
        <Button size='large' className='rounded-none absolute'>
          <Link to={`/`}>⬅️ Dashboard</Link>
        </Button>
        <h1 className='text-center font-bold text-5xl'>MANAGE BOOKS</h1>
      </header>
      <main className='py-4 px-4 space-y-6'>
        <div className='flex justify-between'>
          <Button type='primary' size='large' className='rounded-none' onClick={handleBookAdd}>
            <span className='font-bold'>+</span>&nbsp; Add Book
          </Button>
          {isSuccessAlertVisible && (
            <Alert
              message={message}
              type="success"
              showIcon
              closable
            />
          )}
          {isErrorAlertVisible && (
            <Alert
              message={message}
              type="error"
              showIcon
              closable
            />
          )}
        </div>
        <div>
          <Table dataSource={dataSource} columns={columns} size="middle" />
        </div>
      </main>
      <AddEditBookModal
        authors={authors}
        initialValues={activeBook && { ...activeBook, author: activeBook?.authorId }}
        isEdit={isEdit}
        isModalOpen={isAddEditModalOpen}
        setIsModalOpen={setIsAddEditModalOpen}
        onOk={bookAddEdit}
      />
      <ViewBookModal book={activeBook && { ...activeBook, author: activeBook?.name }} isModalOpen={isViewModalOpen} setIsModalOpen={setIsViewModalOpen} />
      <DeleteBookModal book={activeBook} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} onOk={bookDelete} />
    </div>
  )
}

export default BooksPage
