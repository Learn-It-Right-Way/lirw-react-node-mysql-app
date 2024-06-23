import { Modal } from "antd";
import { BookDTO } from "../models/Books";

type Props = {
   isModalOpen: boolean;
   book?: BookDTO;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

enum ValueMappings {
   "id" = "ID",
   "title" = "TITLE",
   "releaseDate" = "RELEASE DATE",
   "description" = "BOOK DESCRIPTION",
   "pages" = "TOTAL PAGES",
   "author" = "AUTHOR",
   "birthday" = "BIRTHDAY",
   "bio" = "AUTHOR DESCRIPTION",
   "createdAt" = "CREATED DATE",
   "updatedAt" = "UPDATED DATE",
}

export const ViewBookModal = ({ isModalOpen, book, setIsModalOpen }: Props) => {
   const handleCancel = () => {
      setIsModalOpen(false);
   }

   const renderBookDetails = () => {
      if (book) {
         const details = Object.keys(book).map((key: string) => {
            return (
               <div key={key}>
                  <p className="font-bold">{ValueMappings[key as keyof typeof ValueMappings]}</p>
                  <p>{book[key as keyof BookDTO]}</p>
               </div>
            )
         });

         return details;
      }

      return null;
   }

   return (
      <Modal
         title="Book Details"
         open={isModalOpen}
         okButtonProps={{
            hidden: true
         }}
         onCancel={handleCancel}
         cancelText="Close"
         width={1000}
      >
         <div className="space-y-3">
            {renderBookDetails()}
         </div>
      </Modal>
   )
}
