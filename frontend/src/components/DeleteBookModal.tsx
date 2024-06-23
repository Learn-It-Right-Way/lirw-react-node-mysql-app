import { Modal } from "antd";
import { Book } from "../models/Books";

type Props = {
   isModalOpen: boolean;
   book?: Book;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   onOk: () => void
}

export const DeleteBookModal = ({ isModalOpen, book, setIsModalOpen, onOk }: Props) => {
   const handleOk = () => {
      onOk();
      setIsModalOpen(false);
   }

   const handleCancel = () => {
      setIsModalOpen(false);
   }

   return (
      <Modal title={`Delete Book`} open={isModalOpen} onOk={handleOk} okType="danger" okText="Delete" onCancel={handleCancel}>
         <p>Are you sure, you want to delete book <span className="font-bold">{` ${book?.title}`}</span>?</p>
      </Modal>
   )
}
