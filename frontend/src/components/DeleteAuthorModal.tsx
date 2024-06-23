import { Modal } from "antd";
import { Author } from "../models/Author";

type Props = {
   isModalOpen: boolean;
   author?: Author;
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   onOk: () => void
}

export const DeleteAuthorModal = ({ isModalOpen, author, setIsModalOpen, onOk }: Props) => {
   const handleOk = () => {
      onOk();
      setIsModalOpen(false);
   }

   const handleCancel = () => {
      setIsModalOpen(false);
   }

   return (
      <Modal title={`Delete Author`} open={isModalOpen} onOk={handleOk} okType="danger" okText="Delete" onCancel={handleCancel}>
         <p>Are you sure, you want to delete author <span className="font-bold">{` ${author?.name}`}</span>?</p>
      </Modal>
   )
}
