import { Modal } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useState } from "react";
import { BookCreateEditForm } from "./BookCreateEditForm";
import { BookFormDTO } from "../models/Books";
import { Author } from "../models/Author";

type Props = {
   isModalOpen: boolean;
   isEdit: boolean;
   initialValues?: BookFormDTO;
   authors: Author[];
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   onOk: (values: BookFormDTO) => void;
}

export const AddEditBookModal = ({
   isModalOpen, isEdit, initialValues, authors, setIsModalOpen, onOk
}: Props) => {
   const [formInstance, setFormInstance] = useState<FormInstance>();

   const handleOk = async () => {
      try {
         const values = await formInstance?.validateFields();
         formInstance?.resetFields();
         onOk(values);
         setIsModalOpen(false);
      } catch (error) {
         console.log('Failed:', error);
      }
   }

   const handleCancel = () => {
      setIsModalOpen(false);
   }

   return (
      <Modal
         title={isEdit ? 'Edit Book' : 'Add Book'}
         open={isModalOpen}
         okText="Add"
         onOk={handleOk}
         okButtonProps={{ autoFocus: true }}
         onCancel={handleCancel}
         width={750}
         destroyOnClose
      >
         <BookCreateEditForm
            initialValues={initialValues}
            authors={authors}
            onFormInstanceReady={(instance: FormInstance) => {
               setFormInstance(instance);
            }}
         />
      </Modal>
   )
}
