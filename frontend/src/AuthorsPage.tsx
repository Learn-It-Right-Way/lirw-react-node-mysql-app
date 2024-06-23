import { Alert, Button, Table } from 'antd'
import './App.css'
import { useEffect, useState } from 'react'
import { IconEdit } from './components/IconEdit';
import { IconDelete } from './components/IconDelete';
import { IconView } from './components/IconView';
import { Link } from 'react-router-dom';
import { Author } from './models/Author';
import { AddEditAuthorModal } from './components/AddEditAuthorModal';
import { ViewAuthorModal } from './components/ViewAuthorModal';
import { DeleteAuthorModal } from './components/DeleteAuthorModal';
const API_URL = import.meta.env.VITE_API_URL;

const columns = [
   {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
   {
      title: 'Author',
      dataIndex: 'name',
      key: 'name',
   },
   {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
   },
   {
      title: 'Description',
      dataIndex: 'bio',
      key: 'bio',
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
   }
];

function AuthorsPage() {
   const [authors, setAuthors] = useState<Author[]>([]);
   const [dataSource, setDataSource] = useState<Author[]>([]);
   const [activeAuthor, setActiveAuthor] = useState<Author>();
   const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
   const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
   const [message, setMessage] = useState('');
   const [isEdit, setIsEdit] = useState(false);

   useEffect(() => {
      fetchAuthors();
   }, [])

   useEffect(() => {
      formatAuthorsForDisplay(authors);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [authors])

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

   const editAuthor = async (author: Author) => {
      try {
         if (activeAuthor) {
            const response = await fetch(`${API_URL}/authors/${activeAuthor.id}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(author),
            });
            const { message, authors } = await response.json();

            if (!response.ok) {
               throw new Error(message);
            }

            setAuthors(authors);
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

   const addAuthor = async (author: Author) => {
      try {
         const response = await fetch(`${API_URL}/authors`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(author),
         });
         const { message, authors } = await response.json();
 
         if (!response.ok) {
            throw new Error(message);
         }

         setAuthors(authors);
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

   const authorAddEdit = (author: Author) => {
      if (isEdit) {
         editAuthor(author);
         return;
      }

      addAuthor(author);
   }

   const authorDelete = async () => {
      try {
         if (activeAuthor) {
            const response = await fetch(`${API_URL}/authors/${activeAuthor.id}`, {
               method: 'DELETE',
               headers: {
                  'Content-Type': 'application/json',
               }
            });
            const { message, authors } = await response.json();

            if (!response.ok) {
               throw new Error(message);
            }

            setAuthors(authors);
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

   const handleAuthorAdd = () => {
      setActiveAuthor(undefined);
      setIsEdit(false);
      setIsAddEditModalOpen(true);
   }

   const handleAuthorEdit = (author: Author) => {
      setActiveAuthor(author);
      setIsEdit(true);
      setIsAddEditModalOpen(true);
   }

   const handleAuthorView = (author: Author) => {
      setActiveAuthor(author);
      setIsViewModalOpen(true);
   }

   const handleAuthorDelete = (author: Author) => {
      setActiveAuthor(author);
      setIsDeleteModalOpen(true);
   }

   const formatAuthorsForDisplay = (authors: Author[]) => {
      if (authors.length > 0) {
         const dataSource = [];

         for (const author of authors) {
            const authorObj = {
               key: author.id,
               id: author.id,
               name: author.name,
               birthday: author.birthday,
               bio: author.bio,
               createdAt: author.createdAt,
               updatedAt: author.updatedAt,
               actions: (
                  <div className='flex space-x-4'>
                     <Button icon={<IconEdit />} onClick={() => handleAuthorEdit(author)} />
                     <Button type='primary' icon={<IconView />} onClick={() => handleAuthorView(author)} />
                     <Button type='primary' icon={<IconDelete />} danger onClick={() => handleAuthorDelete(author)} />
                  </div>
               )
            }

            dataSource.push(authorObj);
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
            <h1 className='text-center font-bold text-5xl'>MANAGE AUTHORS</h1>
         </header>
         <main className='py-4 px-4 space-y-6'>
            <div className='flex justify-between'>
               <Button type='primary' size='large' className='rounded-none' onClick={handleAuthorAdd}>
                  <span className='font-bold'>+</span>&nbsp; Add Author
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
         <AddEditAuthorModal initialValues={activeAuthor} isEdit={isEdit} isModalOpen={isAddEditModalOpen} setIsModalOpen={setIsAddEditModalOpen} onOk={authorAddEdit} />
         <ViewAuthorModal author={activeAuthor} isModalOpen={isViewModalOpen} setIsModalOpen={setIsViewModalOpen} />
         <DeleteAuthorModal author={activeAuthor} isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} onOk={authorDelete} />
      </div>
   )
}

export default AuthorsPage
