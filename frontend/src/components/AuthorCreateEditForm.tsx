import { Form, FormInstance, Input } from "antd"
import { useEffect } from "react";
import { Author } from "../models/Author";

interface Props {
   initialValues?: Author;
   onFormInstanceReady: (instance: FormInstance<Author>) => void;
}

const { TextArea } = Input;

export const AuthorCreateEditForm = ({ initialValues, onFormInstanceReady }: Props) => {
   const [form] = Form.useForm();

   useEffect(() => {
      onFormInstanceReady(form);
   }, []);

   return (
      <Form form={form} layout="vertical" name="add_edit_author_form" initialValues={initialValues}>
         <Form.Item name="name" label="Name">
            <Input type="text" placeholder="Name" />
         </Form.Item>
         <Form.Item name="birthday" label="Birthday">
            <Input type="date" />
         </Form.Item>
         <Form.Item name="bio" label="Description">
            <TextArea rows={4} placeholder="Description" />
         </Form.Item>
      </Form>
   )
}
