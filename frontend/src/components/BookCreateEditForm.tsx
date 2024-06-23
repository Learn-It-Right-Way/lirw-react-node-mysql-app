import { Form, FormInstance, Input, Select } from "antd"
import { useEffect } from "react";
import { BookFormDTO } from "../models/Books";
import { Author } from "../models/Author";

interface Props {
   initialValues?: BookFormDTO;
   authors: Author[];
   onFormInstanceReady: (instance: FormInstance<BookFormDTO>) => void;
}

const { TextArea } = Input;

export const BookCreateEditForm = ({ initialValues, authors, onFormInstanceReady }: Props) => {
   const [form] = Form.useForm();

   useEffect(() => {
      onFormInstanceReady(form);
   }, []);

   const renderOptions = () => {
      return authors.map(author => ({ value: author.id, label: author.name }))
   }

   return (
      <Form form={form} layout="vertical" name="add_edit_book_form" initialValues={initialValues}>
         <Form.Item name="title" label="Title">
            <Input type="text" placeholder="Title" />
         </Form.Item>
         <Form.Item name="releaseDate" label="Release Date">
            <Input type="date" />
         </Form.Item>
         <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Description" />
         </Form.Item>
         <Form.Item name="pages" label="Pages">
            <Input type="number" placeholder="Pages" />
         </Form.Item>
         <Form.Item name="author" label="Author">
            <Select
               placeholder="Author"
               options={renderOptions()}
            />
         </Form.Item>
      </Form>
   )
}
