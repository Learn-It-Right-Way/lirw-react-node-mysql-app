import { Modal } from "antd";
import { Author } from "../models/Author";

type Props = {
   isModalOpen: boolean;
   author?: Author;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

enum ValueMappings {
   "id" = "ID",
   "name" = "NAME",
   "birthday" = "BIRTHDAY",
   "bio" = "DESCRIPTION",
   "createdAt" = "CREATED DATE",
   "updatedAt" = "UPDATED DATE",
}

export const ViewAuthorModal = ({ isModalOpen, author, setIsModalOpen }: Props) => {
   const handleCancel = () => {
      setIsModalOpen(false);
   }

   const renderAuthorDetails = () => {
      if (author) {
         const details = Object.keys(author).map((key: string) => {
            return (
               <div key={key}>
                  <p className="font-bold">{ValueMappings[key as keyof typeof ValueMappings]}</p>
                  <p>{author[key as keyof Author]}</p>
               </div>
            )
         });

         return details;
      }

      return null;
   }

   return (
      <Modal
         title="Author Details"
         open={isModalOpen}
         okButtonProps={{
            hidden: true
         }}
         onCancel={handleCancel}
         cancelText="Close"
         width={1000}
      >
         <div className="space-y-3">
            {renderAuthorDetails()}
         </div>
      </Modal>
   )
}
